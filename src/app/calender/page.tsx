'use client'
import { useState, useEffect } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
} from 'date-fns'
import { FaQuestion, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Image from 'next/image'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts'
import { useRouter } from 'next/navigation'

// 타입 정의 추가
type CategoryData = {
  url: string
  count: number
  categories: { [key: string]: number }
}

type CalendarData = {
  [date: string]: CategoryData
}

type CustomTickProps = {
  payload: {
    value: string
  }
  x: number
  y: number
  textAnchor: string
}

const categoryImageMap: { [key: string]: string } = {
  スペシャルできた: '/images/img_gemstone.png',
  学校でさた: '/images/img_gemstone.png',
  せいかつできた: '/images/img_lab.png',
  うんどうできた: '/images/img_gemstone.png',
  創造できた: '/images/img_gemstone.png',
  なかよくできた: '/images/img_gemstone.png',
}

const CustomTick = ({ payload, x, y, textAnchor }: CustomTickProps) => (
  <g transform={`translate(${x},${y})`}>
    <image
      href={categoryImageMap[payload.value] || '/default-image.png'}
      x={-15}
      y={-20}
      width={40}
      height={24}
    />
    <text
      textAnchor={textAnchor}
      fontSize="12px"
      fill="#333"
      y={10}
      dy="0.5em"
      className="font-bold"
    >
      {payload.value}
    </text>
  </g>
)

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [hydrated, setHydrated] = useState(false)
  const router = useRouter()
  useEffect(() => {
    setHydrated(true)
  }, [])

  const generateDummyData = () => {
    const data: CalendarData = {}
    const categories = Object.keys(categoryImageMap)
    let day = startOfMonth(currentDate)
    const endMonth = endOfMonth(currentDate)

    while (day <= endMonth) {
      data[format(day, 'yyyy-MM-dd')] = {
        url:
          categoryImageMap[categories[Math.floor(Math.random() * categories.length)]] ||
          '/default-image.png',
        count: Math.floor(Math.random() * 5),
        categories: categories.reduce(
          (acc, cat) => {
            acc[cat] = Math.floor(Math.random() * 5)
            return acc
          },
          {} as { [key: string]: number }
        ),
      }
      day = addDays(day, 1)
    }
    return data
  }

  const dummyImageData = generateDummyData()
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

  const generateCalendarDays = () => {
    const days: Date[] = []
    let day = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 })
    const endDate = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 })

    while (day <= endDate) {
      days.push(day)
      day = addDays(day, 1)
    }
    return days
  }

  const categoryData = Object.keys(categoryImageMap).map((cat) => ({
    category: cat,
    count: Object.values(dummyImageData).reduce((sum, day) => sum + (day.categories[cat] || 0), 0),
  }))

  return (
    <div className="h-[900px] mx-auto w-[390px] items-center flex flex-col">
      <div className="flex flex-col p-4 bg-gray-100">
        <div className="flex justify-between mb-4">
          <button
            onClick={prevMonth}
            className="px-4 py-2 bg-yellow-400 text-black font-bold rounded-full flex"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={nextMonth}
            className="px-4 py-2 bg-yellow-400 text-black font-bold rounded-full flex"
          >
            {format(currentDate, 'M月')} <FaChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-sm h-full">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="font-bold p-2">
              {day}
            </div>
          ))}

          {generateCalendarDays().map((day, index) => {
            const isCurrentMonth = format(day, 'MM') === format(currentDate, 'MM')
            const formattedDate = format(day, 'yyyy-MM-dd')
            const imageInfo = dummyImageData[formattedDate] || {}

            return (
              <div
                key={index}
                className={`border p-2 relative flex flex-col items-center justify-center ${isCurrentMonth ? 'text-black' : 'text-gray-400'}`}
                style={{ width: '50px', height: '50px' }}
              >
                <span className="absolute top-0 left-0 text-[7px]">{format(day, 'd')}</span>
                {imageInfo.url && (
                  <Image
                    src={imageInfo.url}
                    alt="category image"
                    width={30}
                    height={30}
                    className="my-1 cursor-pointer"
                    onClick={() => router.push('/')}
                  />
                )}
                {hydrated && imageInfo.count > 0 && (
                  <span className="absolute bottom-0 right-0 text-sm text-gray-500">
                    {imageInfo.count}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center justify-center">
        <div className="border-b-2 border-orange-500 w-3/4 text-center pb-1 mb-3">
          <h1 className="text-lg font-bold">できたんカテゴリー</h1>
        </div>

        <RadarChart outerRadius={120} width={400} height={320} data={categoryData}>
          <PolarGrid stroke="#add8e6" polarRadius={[120]} strokeWidth={5} />
          <PolarAngleAxis dataKey="category" tick={CustomTick} />
          <Radar name="Tasks" dataKey="count" stroke="#add8e6" fill="#add8e6" fillOpacity={0.6} />
        </RadarChart>
        <div className="flex flex-row">
          <FaQuestion className="text-white bg-yellow-500 rounded-full p-1 text-3xl" />

          <a className=" ml-3 text-lg font-medium" href="/category">
            できたんカテゴリーについて ＞
          </a>
        </div>
      </div>
    </div>
  )
}
