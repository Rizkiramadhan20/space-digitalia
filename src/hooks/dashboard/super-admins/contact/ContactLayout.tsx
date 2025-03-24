"use client"

import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { ref, onValue, query, orderByChild, update } from 'firebase/database'

import { database } from '@/utils/firebase'

import { Contacts } from '@/hooks/dashboard/super-admins/contact/lib/contacts'

import ContactSkelaton from "@/hooks/dashboard/super-admins/contact/ContactSkelaton"

import ContactCard from '@/hooks/dashboard/super-admins/contact/ui/ContactCard'

import ViewMessageModal from '@/hooks/dashboard/super-admins/contact/ui/ViewMessageModal'

import ReplyModal from '@/hooks/dashboard/super-admins/contact/ui/ReplyModal'

import { toast } from 'react-hot-toast'

export default function ContactLayout() {
    const [contacts, setContacts] = useState<Contacts[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedMessage, setSelectedMessage] = useState<Contacts | null>(null)
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false)
    const [replyMessage, setReplyMessage] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [repliedMessages, setRepliedMessages] = useState<Set<string>>(new Set())

    useEffect(() => {
        const contactsRef = ref(database, process.env.NEXT_PUBLIC_COLLECTIONS_CONTACTS)
        const contactsQuery = query(contactsRef, orderByChild('createdAt'))

        const unsubscribe = onValue(contactsQuery, (snapshot) => {
            const data = snapshot.val()
            if (data) {
                const contactsArray = Object.entries(data).map(([id, value]) => ({
                    id,
                    ...(value as Omit<Contacts, 'id'>)
                })).reverse()

                setContacts(contactsArray)
            } else {
                setContacts([])
            }
            setLoading(false)
        }, (error) => {
            console.error('Error fetching contacts:', error)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const handleViewMessage = async (message: Contacts) => {
        setSelectedMessage(message)
        const modal = document.getElementById('contact_modal') as HTMLDialogElement
        modal?.showModal()

        if (message.status === 'unread') {
            const messageRef = ref(database, `${process.env.NEXT_PUBLIC_COLLECTIONS_CONTACTS}/${message.id}`)
            try {
                await update(messageRef, {
                    ...message,
                    status: 'read'
                })
            } catch (error) {
                console.error('Error updating status:', error)
            }
        }
    }

    const handleReply = async () => {
        if (!selectedMessage || !replyMessage.trim()) return;

        setIsSending(true);
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: selectedMessage.email,
                    subject: `Re: Message from ${selectedMessage.fullName}`,
                    message: replyMessage,
                    originalMessage: selectedMessage
                }),
            });

            const data = await response.json();
            if (data.success) {
                setReplyMessage('');
                setIsReplyModalOpen(false);
                setRepliedMessages(prev => new Set([...prev, selectedMessage.id]));
                toast.success('Reply sent successfully!', {
                    duration: 4000,
                    position: 'top-right',
                    style: {
                        background: '#10B981',
                        color: '#fff',
                        borderRadius: '12px',
                    },
                    icon: '✉️',
                });
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error('Error sending reply:', error);
            toast.error('Failed to send reply. Please try again.', {
                duration: 4000,
                position: 'top-right',
                style: {
                    background: '#EF4444',
                    color: '#fff',
                    borderRadius: '12px',
                },
            });
        } finally {
            setIsSending(false);
        }
    };

    const handleOpenReply = () => {
        const firstModal = document.getElementById('contact_modal') as HTMLDialogElement;
        firstModal?.close();
        setIsReplyModalOpen(true);
    };

    const handleCloseReply = () => {
        setIsReplyModalOpen(false);
        setReplyMessage('');
        const firstModal = document.getElementById('contact_modal') as HTMLDialogElement;
        firstModal?.showModal();
    };

    if (loading) {
        return <ContactSkelaton />
    }

    return (
        <section className='min-h-full px-0'>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-6 md:p-8 transition-all duration-300 z-10"
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                    <div className="space-y-2">
                        <h1 className='text-2xl md:text-3xl font-bold'>
                            Contact
                        </h1>
                        <p className='text-slate-600 text-sm md:text-base'>
                            Kelola dan organisir kontak berdasarkan tanggal
                        </p>
                    </div>
                    <button className="group w-full md:w-auto px-6 py-3 bg-gradient-to-r from-primary/90 to-primary rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-xl hover:-translate-y-0.5">
                        Show Filter
                    </button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contacts.map((message) => (
                    <ContactCard
                        key={message.id}
                        message={message}
                        onViewMessage={handleViewMessage}
                        repliedMessages={repliedMessages}
                    />
                ))}
            </div>

            <ViewMessageModal
                selectedMessage={selectedMessage}
                repliedMessages={repliedMessages}
                onClose={() => setSelectedMessage(null)}
                onReply={handleOpenReply}
            />

            <ReplyModal
                isOpen={isReplyModalOpen}
                selectedMessage={selectedMessage}
                replyMessage={replyMessage}
                isSending={isSending}
                onReplyChange={setReplyMessage}
                onClose={handleCloseReply}
                onSend={handleReply}
            />
        </section>
    )
}
