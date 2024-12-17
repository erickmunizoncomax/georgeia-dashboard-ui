import tw from 'tailwind-styled-components'
import Slider from 'react-slick'
import { useMemo } from 'react'
import treadingArrowDown from '../../assets/images/treading-arrow-down.png'
import treadingArrowUp from '../../assets/images/treading-arrow-up.png'

const StudentPerformanceNProgressKpiWrapper = tw.div`
  student-performance-progress-kpi-wrapper
  px-0.5
  bg-opacity-50
  pt-2
  pb-4
  ${props => props.$active ? 'bg-[#49726d]' : 'bg-[#495772]'}
  ${props => props.$isFirst ? 'rounded-l !pl-2' : ''}
  ${props => props.$isLast ? 'rounded-r !pr-2' : ''}
`

const KpiItemContainer = tw.div`
  kpi-item-container
  h-36
  w-80
  min-w-80
  flex
  flex-col
  bg-white
  rounded
  p-4
  flex
  flex-col
  justify-between
  cursor-pointer
  shadow-[0_4px_8px_2px_rgba(0,0,0,0.2)]
  ${props => props.$active ? 'bg-white' : 'bg-[#27273d]'}
`

const PrimaryPText = tw.p`
  leading-none
  ${props => props.$active ? 'text-[#0c1b28]' : 'text-white'}
`

const SecondaryPText = tw.p`
  leading-none
  font-light
  text-[10px]
  ${props => props.$active ? 'text-[#4f4f4f]' : 'text-white opacity-75'}
`

const StudentPerformanceNProgressKpi = (props) => {
  const {
    active,
    type,
    title,
    currentPeriodValue,
    currentPeriodSuffix,
    targetValue,
    targetVarianceDirection,
    lastPeriodVarianceDirection,
    onKpiClick
  } = props

  const formatValueFractionDigits = (value, fractionDigits) => {
    return value?.toLocaleString('en-US', {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits
    })
  }

  const metricValue = useMemo(() => {
    let value
    if (title === 'Total Incidents') {
      value = formatValueFractionDigits(currentPeriodValue, 0)
    } else {
      value = formatValueFractionDigits(currentPeriodValue, 1)
    }

    return `${value}${currentPeriodSuffix}`
  }, [title, currentPeriodValue, currentPeriodSuffix])

  const lastPeriodValue = useMemo(() => {
    if (title === 'Total Incidents') {
      return formatValueFractionDigits(props.lastPeriodValue, 0)
    } else {
      return formatValueFractionDigits(props.lastPeriodValue, 1)
    }
  }, [props.lastPeriodValue])

  const targetVariance = useMemo(() => {
    if (title === 'Total Incidents') {
      return props.targetVariance ? formatValueFractionDigits(props.targetVariance, 0) : '-'
    } else {
      return `${formatValueFractionDigits(props.targetVariance, 1)}%`
    }
  }, [props.targetVariance])

  const lastPeriodVariance = useMemo(() => {
    if (title === 'Total Incidents') {
      return props.lastPeriodVariance ? formatValueFractionDigits(props.lastPeriodVariance, 0) : '-'
    } else {
      return `${formatValueFractionDigits(props.lastPeriodVariance, 1)}%`
    }
  }, [props.lastPeriodVariance])

  return (
    <KpiItemContainer $active={active} onClick={onKpiClick}>
      <div className="top-content flex items-center space-x-2">
        <div className="flag-icon-container h-10 w-10 min-w-10 flex items-center justify-center">
          {
            (type === "Strength" || type === 'Improvements Shown') ? (
              <i className="pi pi-flag-fill text-[#019049] !text-3xl" />
            ) : (
              type === "Weaknesses" ? (
                <i className="pi pi-flag-fill text-[#d9685b] !text-3xl" />
              ) : (
                <i className="pi pi-flag-fill text-[#019049] !text-3xl" />
              )
            )
          }
        </div>
        <div className="text-container">
          <PrimaryPText $active={active}>
            { title }
          </PrimaryPText>
        </div>
      </div>
      <div className="bottom-content flex items-start justify-between">
        <div className="left-content flex flex-col">
          <div className="title-container">
            <SecondaryPText $active={active}>
              Current Period
            </SecondaryPText>
          </div>
          <div className="value-container">
            <PrimaryPText $active={active}
                          className="text-2xl leading-none">
              { metricValue }
            </PrimaryPText>
          </div>
        </div>
        <div className="right-content flex flex-col space-y-1.5">
          <div className="row-container flex items-center space-x-3">
            <div className="target-container">
              <SecondaryPText $active={active}>
                Target
              </SecondaryPText>
            </div>
            <div className="value-container">
              <PrimaryPText $active={active}>
                { targetValue ? `${targetValue.toFixed(1)}%` : '' }
              </PrimaryPText>
            </div>
            <div className={`variance-container rounded-full px-2 py-0.5 flex space-x-1 ${targetVarianceDirection === 'NEGATIVE' ? 'bg-[#d9685b]' : 'bg-[#129b83]'}`}>
              {
                targetVarianceDirection === 'NEGATIVE' ? (
                  <img src={treadingArrowDown} className="h-2" alt="" />
                ) : (
                  <img src={treadingArrowUp} className="h-2" alt="" />
                )
              }
              <p className="text-white text-[9px] leading-none">
                { targetVariance }
              </p>
            </div>
          </div>
          <div className="row-container flex items-center space-x-3">
            <div className="target-container">
              <SecondaryPText $active={active}
                              className="whitespace-nowrap">
                Last Period
              </SecondaryPText>
            </div>
            <div className="value-container">
              <PrimaryPText $active={active}>
                { lastPeriodValue }{ currentPeriodSuffix }
              </PrimaryPText>
            </div>
            <div
              className={`variance-container rounded-full px-2 py-0.5 flex space-x-1 ${lastPeriodVarianceDirection === 'NEGATIVE' ? 'bg-[#d9685b]' : 'bg-[#129b83]'}`}>
              {
                lastPeriodVarianceDirection === 'NEGATIVE' ? (
                  <img src={treadingArrowDown} className="h-2" alt=""/>
                ) : (
                  <img src={treadingArrowUp} className="h-2" alt=""/>
                )
              }
              <p className="text-white text-[9px] leading-none">
                { lastPeriodVariance }
              </p>
            </div>
          </div>
        </div>
      </div>
    </KpiItemContainer>
  )
}

const CustomNextArrow = (props) => {
  const { className, onClick } = props
  return (
    <div className={`${className} before:content-[""] flex items-center justify-center`}
         onClick={onClick}>
      <i className="pi pi-chevron-right text-white !text-2xl opacity-50" />
    </div>
  )
}

const CustomPrevArrow = (props) => {
  const { className, onClick } = props
  return (
    <div className={`${className} before:content-[""] flex items-center justify-center`}
         onClick={onClick}>
      <i className="pi pi-chevron-left text-white !text-2xl opacity-50" />
    </div>
  )
}

const StudentPerformanceProgressKpiWrapper = (props) => {
  const { item, isFirst, isLast, activeGroupName, activeKpiName, onKpiClick } = props

  return (
    <>
      <StudentPerformanceNProgressKpiWrapper $active={item.parent === activeGroupName}
                                             $isFirst={isFirst}
                                             $isLast={isLast}>
        <div className="title-container flex items-center mb-2">
          <p className="text-white h-6">
            { isFirst ? item.parent : '' }
          </p>
        </div>
        <div className="kpi-container">
          <StudentPerformanceNProgressKpi active={item.METRIC_NAME === activeKpiName}
                                          type={item.TYPE}
                                          title={item.METRIC_NAME}
                                          currentPeriodValue={item.VALUE}
                                          currentPeriodSuffix={item.METRIC_SUFFIX}
                                          targetValue={item.TARGET}
                                          targetVariance={item.CURR_DIFF}
                                          targetVarianceDirection={item.INT_CUR}
                                          lastPeriodValue={item.PREV_VALUE}
                                          lastPeriodVariance={item.PREV_DIFF}
                                          lastPeriodVarianceDirection={item.INT_PREV}
                                          onKpiClick={() => onKpiClick(item)}/>
        </div>
      </StudentPerformanceNProgressKpiWrapper>
    </>
  )
}

const StudentPerformanceProgressKpiCarousel = (props) => {
  const { groups, activeKpiName, onKpiClick } = props

  const settings = {
    className: 'slider variable-width max-w-full !bg-transparent before:hidden',
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    infinite: false
  }

  const activeGroupName = useMemo(() => {
    const activeGroup = groups.find(group => group.items.some(item => item.METRIC_NAME === activeKpiName))
    if (activeGroup) return activeGroup.name
  }, [activeKpiName, groups])

  return (
    <>
      <div className="kpi-slider-container w-full relative h-52 flex items-center justify-center mt-4">
        <div className="slider-container h-full w-[calc(100%-100px)] relative flex items-center">
          <Slider {...settings}>
            {
              groups?.map((group, groupIndex) => (
                group.items.map((item, itemIndex, arr) => (
                  <div key={`${groupIndex}-${itemIndex}`}>
                    <StudentPerformanceProgressKpiWrapper item={item}
                                                          isFirst={itemIndex === 0}
                                                          isLast={itemIndex === arr.length - 1}
                                                          activeGroupName={activeGroupName}
                                                          activeKpiName={activeKpiName}
                                                          onKpiClick={onKpiClick} />
                  </div>
                ))
              ))
            }
          </Slider>
        </div>
      </div>
    </>
  )
}

export default StudentPerformanceProgressKpiCarousel
