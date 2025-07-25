import React from 'react'
import SolutionBanner from '../components/solutionsComponents/SolutionBanner'
import IntegratedPlatform from '../components/solutionsComponents/IntegratedPlatform'
import StrategyDevelopmentSection from '../components/solutionsComponents/StrategyDevelopmentSection'
import StrategyCommunication from '../components/solutionsComponents/StrategyCommunication'
import StrategyTranslation from '../components/solutionsComponents/StrategyTranslation'
import CTASection from '../components/homeComponents/CTASection'
import ABCSolutions from '../components/solutionsComponents/ABCSolutions'

const page = () => {
  return (
    <div>
        <SolutionBanner></SolutionBanner>
        <IntegratedPlatform></IntegratedPlatform>
        <StrategyDevelopmentSection></StrategyDevelopmentSection>
        <StrategyCommunication></StrategyCommunication>
        <StrategyTranslation></StrategyTranslation>
        <ABCSolutions></ABCSolutions>
        <CTASection></CTASection>
    </div>
  )
}

export default page