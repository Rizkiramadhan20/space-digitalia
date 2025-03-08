import dynamic from 'next/dynamic'

import { Document, Page, Text, View, StyleSheet, PDFDownloadLink as PDFDownloadLinkOriginal } from '@react-pdf/renderer'

export const PDFDownloadLink = dynamic(
    () => Promise.resolve(PDFDownloadLinkOriginal),
    {
        ssr: false,
        loading: () => (
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl opacity-50 cursor-wait">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Loading PDF Generator...
            </button>
        )
    }
)

import { Transaction } from '@/hooks/dashboard/super-admins/transaction/transaction/lib/schema'

interface TransactionPDFProps {
    transaction: Transaction
}

export const TransactionPDF = ({ transaction }: TransactionPDFProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.title}>Transaction Receipt</Text>
                <Text style={styles.orderId}>Order ID: {transaction.orderId}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Transaction Details</Text>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Status:</Text>
                    <Text style={styles.value}>{transaction.status}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Amount:</Text>
                    <Text style={styles.value}>Rp {transaction.amount.toLocaleString()}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Payment Method:</Text>
                    <Text style={styles.value}>{transaction.paymentMethod}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Delivery Method:</Text>
                    <Text style={styles.value}>{transaction.deliveryMethod}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Project Information</Text>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Project Title:</Text>
                    <Text style={styles.value}>{transaction.projectTitle}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>License Type:</Text>
                    <Text style={styles.value}>{transaction.licenseType}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Customer Information</Text>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{transaction.userName}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{transaction.userEmail}</Text>
                </View>
            </View>

            {transaction.deliveryMethod === "delivery" && transaction.deliveryAddress && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Delivery Information</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Recipient:</Text>
                        <Text style={styles.value}>{transaction.deliveryAddress.fullName}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Phone:</Text>
                        <Text style={styles.value}>{transaction.deliveryAddress.phone}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Address:</Text>
                        <Text style={styles.value}>
                            {transaction.deliveryAddress.streetAddress}, {transaction.deliveryAddress.district}, {transaction.deliveryAddress.city}, {transaction.deliveryAddress.province} {transaction.deliveryAddress.postalCode}
                        </Text>
                    </View>
                </View>
            )}

            <View style={styles.footer}>
                <Text style={styles.timestamp}>
                    Created: {transaction.createdAt.toDate().toLocaleString('id-ID')}
                </Text>
            </View>
        </Page>
    </Document>
);

const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#ffffff'
    },
    header: {
        marginBottom: 20,
        borderBottom: 1,
        borderBottomColor: '#e5e7eb',
        paddingBottom: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#1f2937'
    },
    orderId: {
        fontSize: 12,
        color: '#6b7280'
    },
    section: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f9fafb',
        borderRadius: 5
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#374151'
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: 5
    },
    label: {
        flex: 1,
        fontSize: 12,
        color: '#6b7280'
    },
    value: {
        flex: 2,
        fontSize: 12,
        color: '#1f2937'
    },
    footer: {
        marginTop: 20,
        borderTop: 1,
        borderTopColor: '#e5e7eb',
        paddingTop: 10
    },
    timestamp: {
        fontSize: 10,
        color: '#6b7280',
        textAlign: 'right'
    }
});