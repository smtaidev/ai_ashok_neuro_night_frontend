import React from 'react';
import AddAgendaSection from './_components/AddAgendaSection';
import PublishedAgenda from './_components/PublishedAgenda';

const page = () => {
    return (
        <div className='min-h-[calc(100vh-110px)] '>
            <div className='p-5 border rounded-2xl bg-white'>
                <p className="text-sm">The Agenda Builder is your go-to instrument for creating effective and customized agendas for meeting occasions. Whether planning a monthly team meeting, a quarterly review, a board meeting, or an annual strategy session, its lean and intuitive design ensures you can quickly and easily organize your agenda to meet your needs.</p>
                
            </div>
             <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 mt-4">
                <AddAgendaSection/>
                <PublishedAgenda/>
             </div>
        </div>
    );
};

export default page;