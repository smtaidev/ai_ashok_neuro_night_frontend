import React from 'react'
import SolutionBanner from '../../../components/web/solutionsComponents/SolutionBanner'
import IntegratedPlatform from '../../../components/web/solutionsComponents/IntegratedPlatform'
import StrategyDevelopmentSection from '../../../components/web/solutionsComponents/StrategyDevelopmentSection'
import StrategyCommunication from '../../../components/web/solutionsComponents/StrategyCommunication'
import StrategyTranslation from '../../../components/web/solutionsComponents/StrategyTranslation'
import CTASection from '../../../components/web/homeComponents/CTASection'
import ABCSolutions from '../../../components/web/solutionsComponents/ABCSolutions'

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