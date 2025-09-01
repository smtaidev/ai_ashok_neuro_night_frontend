// import React from 'react';
// import BusinessChallenges from './BusinessChallengesDashboard';
// import RegulatoryCompliance from './RegulatoryCompliance';
// import RisksSection from './RisksSection';
// import NewCapabilities from './NewCapabilities';
// import FinancialSnapshot from './FinancialSnapshot';
// import Roadblocks from './Roadblocks';
// import TalentSection from './TalentSection';

// const KeyFactorsImpactingStrategy = () => {
//     return (
//         <div>
//             <BusinessChallenges />
//             <RegulatoryCompliance/>
//             <RisksSection/>
//             <NewCapabilities/>
//             <FinancialSnapshot/>
//             <Roadblocks/>
//             <TalentSection/>
          
//         </div>
//     );
// };

// export default KeyFactorsImpactingStrategy;

import React from 'react';
import BusinessChallenges from './BusinessChallengesDashboard';
import RegulatoryCompliance from './RegulatoryCompliance';
import RisksSection from './RisksSection';
import NewCapabilities from './NewCapabilities';
import FinancialSnapshot from './FinancialSnapshot';
import Roadblocks from './Roadblocks';
import TalentSection from './TalentSection';

const KeyFactorsImpactingStrategy = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Row 1 */}
           
            <div className="col-span-2 md:col-span-1 bg-white rounded-lg ">
                <BusinessChallenges />
            </div>
            <div className="col-span-2 md:col-span-1 bg-white rounded-lg ">
                <RegulatoryCompliance />
            </div>

            {/* Row 2 */}
            <div className="bg-white rounded-lg ">
                <RisksSection />
            </div>
            <div className="grid grid-rows-2 gap-4">
                <NewCapabilities />
                <FinancialSnapshot />
            </div>
           

            {/* Row 3 */}
            <div className="bg-white rounded-lg ">
                <Roadblocks />
            </div>
            <div className="bg-white rounded-lg ">
                <TalentSection />
            </div>
        </div>
    );
};

export default KeyFactorsImpactingStrategy;
