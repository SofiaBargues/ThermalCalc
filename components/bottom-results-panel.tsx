"use client"
import type { Results, RoomData } from "@/types/interfaces"

interface BottomResultsPanelProps {
  results: Results | null
  roomData: RoomData
}

export default function BottomResultsPanel({ results, roomData }: BottomResultsPanelProps) {
  if (!results) return null

  const floorArea = roomData.dimensions.length * roomData.dimensions.width
  const co2Impact = (results.currentHeatLoss * 0.0002 * 2000).toFixed(0) // Approximate CO2 per year

  // Calculate efficiency rating
  const getEfficiencyRating = (score: number) => {
    if (score >= 92) return { rating: "A", bgColor: "bg-green-500" }
    if (score >= 81) return { rating: "B", bgColor: "bg-green-600" }
    if (score >= 69) return { rating: "C", bgColor: "bg-lime-500" }
    if (score >= 55) return { rating: "D", bgColor: "bg-yellow-500" }
    if (score >= 39) return { rating: "E", bgColor: "bg-orange-500" }
    if (score >= 21) return { rating: "F", bgColor: "bg-red-500" }
    return { rating: "G", bgColor: "bg-red-700" }
  }

  const currentRating = getEfficiencyRating(results.currentEnergyScore)

  return (
    <div className="bg-white border-t border-gray-200 h-full">
      <div className="flex h-full">
        {/* Main Results - Optimized for compact height */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-6 gap-4 h-full">
            {/* Floor Area */}
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{floorArea.toFixed(0)}m²</div>
              <div className="text-xs text-gray-600">Floor Area</div>
              <div className="text-xs text-gray-500 mt-1">
                {roomData.dimensions.length}m × {roomData.dimensions.width}m
              </div>
            </div>

            {/* Heat Loss */}
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{results.currentHeatLoss.toFixed(0)}W</div>
              <div className="text-xs text-gray-600">Heat Loss</div>
              <div className="text-xs text-gray-500 mt-1">{(results.currentHeatLoss / floorArea).toFixed(1)}W/m²</div>
            </div>

            {/* Energy Consumption */}
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {((results.currentHeatLoss * 2000) / (1000 * 0.85) / 1000).toFixed(1)}k
              </div>
              <div className="text-xs text-gray-600">kWh/year</div>
              <div className="text-xs text-gray-500 mt-1">{co2Impact}kg CO₂/year</div>
            </div>

            {/* Annual Cost */}
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                ${(((results.currentHeatLoss * 2000) / (1000 * 0.85)) * 0.15).toFixed(0)}
              </div>
              <div className="text-xs text-gray-600">Annual Cost</div>
              <div className="text-xs text-gray-500 mt-1">heating energy</div>
            </div>

            {/* Current Rating */}
            

            {/* Technical Information */}
            
          </div>
        </div>
      </div>
    </div>
  )
}
