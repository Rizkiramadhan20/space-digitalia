"use client";

import React, { useEffect, useState } from 'react'

import { compareDesc, parseISO } from 'date-fns';

import { TeamType } from '@/hooks/pages/about/team/lib/schema'

import { FetchTeam } from '@/hooks/pages/about/team/lib/FetchTeam'

import TeamSkeleton from '@/hooks/pages/about/team/TeamSkeleton'

import { TeamHeader } from '@/hooks/pages/about/team/content/TeamHeader'

import { TeamCard } from '@/hooks/pages/about/team/content/TeamCard'

export default function Team() {
    const [team, setTeam] = useState<TeamType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchTeam(newTeam => {
            setTeam([...newTeam].sort((a, b) =>
                compareDesc(
                    parseISO(a.createdAt as unknown as string),
                    parseISO(b.createdAt as unknown as string)
                )
            ));
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <TeamSkeleton />;
    }

    return (
        <section className='min-h-full px-4 xl:px-10 py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50'>
            <div className='container'>
                <TeamHeader />

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
                    {team.map((member, index) => (
                        <TeamCard
                            key={member.id}
                            member={member}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
