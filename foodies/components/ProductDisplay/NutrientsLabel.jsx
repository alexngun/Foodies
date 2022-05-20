export function MiniNutrientsLabel({n}) {
  return (
    <div className='h-fit w-fit rounded-lg border-[1px] sm:px-8 px-3 py-4'>
        <div className="pb-2 font-bold text-lg text-green-700">
            What's inside (info is per serving)
        </div>
        <div className="grid grid-rows-2 grid-cols-2">
            <div className="px-4 border-r-[1px] border-r-gray-300 border-b-[1px] border-b-gray-300">
                <div className='pt-1 text-gray-600 text-md'>Calories</div>
                <div className="text-center my-2 text-lg font-bold text-gray-700">{n.calories}</div>
            </div>
            <div className="px-4 border-b-[1px] border-b-gray-300">
                <div className='pt-1 text-gray-600 text-md'>Carbs</div>
                <div className="text-center my-2 text-lg font-bold text-gray-700">{n.carb}g</div>
            </div>
            <div className="px-4 border-r-[1px] border-r-gray-300">
                <div className='pt-1 text-gray-600 text-md'>Fat</div>
                <div className="text-center my-2 text-lg font-bold text-gray-700 ">{n.total_fat}g</div>
            </div>
            <div className="px-4">
                <div className='pt-1 text-gray-600 text-md'>Protein</div>
                <div className="text-center my-2 text-lg font-bold text-gray-700">{n.protein}g</div>
            </div>
        </div>
    </div>
  )
}

export function DetailedNutrients({n}) {
    return (
        <div className="h-[600px] w-[95%] mx-auto scale-110 mt-5">
            <div className='h-[23px]  text-gray-600/80 py-[10px] mx-[15px] text-[13px]'>1 serving per container</div>
            <div className="font-bold border-b-[5px] border-b-gray-700 h-[35px] py-[10px] mx-[15px] flex justify-between text-[14px]">
                <span>Serving Size </span>
                <span>1 Tray ({n.portion}g)</span>
            </div>
            <div className='h-[23px] text-gray-600/80 py-[10px] mx-[15px] text-[13px]'>Amount Per Serving</div>
            <div className="h-[40px] py-[10px] mx-[15px] font-bold text-[20px] flex justify-between border-b-[2px] border-b-gray-400">
                <span>Calories</span>
                <span>{n.calories}</span>
            </div>
            <div className="py-[10px] mx-[15px] border-b-[1px] border-b-gray-300 text-[12px] font-bold text-right">% Daily Value</div>
            <div className="py-[10px] mx-[15px] h-[26px] border-b-[2px] border-b-gray-400 text-[12px] font-bold flex justify-between">
                <span>
                    <span className='font-bold mr-[5px]'>Total Fat</span>
                    <span>{n.total_fat}g</span>
                </span>
                <span>{n.total_fat_percentage}%</span>
            </div>
            <div className="py-[10px] ml-[25px] mr-[15px] border-b-[1px] border-b-gray-300 text-[12px] h-[26px] flex justify-between">
                <span>
                    <span className='mr-[5px]'>Saturated Fat</span>
                    <span>{n.saturated_fat}g</span>
                </span>
                <span className='font-bold'>{n.saturated_fat.total_fat_percentage}55%</span>
            </div>
            <div className="py-[10px] ml-[25px] mr-[15px] border-b-[1px] border-b-gray-300 text-[12px] h-[26px] flex justify-between">
                <span>
                    <span className='mr-[5px]'>Trans Fat</span>
                    <span>{n.trans_fat}g</span>
                </span>
            </div>
            <div className="py-[10px] mx-[15px] h-[26px] border-b-[2px] border-b-gray-400 text-[12px] font-bold flex justify-between">
                <span>
                    <span className='font-bold mr-[5px]'>Cholesterol</span>
                    <span className='font-semifont-bold'>{n.cholesterol}mg</span>
                </span>
                <span>{n.cholesterol_percentage}%</span>
            </div>
            <div className="py-[10px] mx-[15px] h-[26px] border-b-[2px] border-b-gray-400 text-[12px] font-bold flex justify-between">
                <span>
                    <span className='font-bold mr-[5px]'>Sodium</span>
                    <span className='font-semifont-bold'>{n.sodium}mg</span>
                </span>
                <span>{n.sodium_percentage}%</span>
            </div>
            <div className="py-[10px] mx-[15px] h-[26px] border-b-[2px] border-b-gray-400 text-[12px] font-bold flex justify-between">
                <span>
                    <span className='font-bold mr-[5px]'>Total Carbohydrates</span>
                    <span className='font-semifont-bold'>{n.carb}g</span>
                </span>
                <span>{n.carb_percentage}%</span>
            </div>
            <div className="py-[10px] ml-[25px] mr-[15px] border-b-[1px] border-b-gray-300 text-[12px] h-[26px] flex justify-between">
                <span>
                    <span className='mr-[5px]'>Dietary Fiber</span>
                    <span>{n.fiber}g</span>
                </span>
                <span className='font-bold'>{n.fiber_percentage}%</span>
            </div>
            <div className="py-[10px] ml-[25px] mr-[15px] border-b-[1px] border-b-gray-300 text-[12px] h-[26px] flex justify-between">
                <span>
                    <span className='mr-[5px]'>Total Sugars</span>
                    <span>{n.sugars}g</span>
                </span>
            </div>
            <div className="py-[10px] ml-[35px] mr-[15px] border-b-[1px] border-b-gray-300 text-[12px] h-[26px] flex justify-between">
                <span>
                    <span className='mr-[5px]'>Includes {n.includes}g Added</span>
                </span>
                <span className='font-bold'>{n.includes_percentage}%</span>
            </div>
            <div className="py-[10px] mx-[15px] h-[26px] border-b-[2px] border-b-gray-400 text-[12px] font-bold flex justify-between">
                <span>
                    <span className='font-bold mr-[5px]'>Protein</span>
                    <span className='font-semifont-bold'>{n.protein}g</span>
                </span>
            </div>
            <div className="py-[10px] mx-[15px] h-[26px] border-b-[1px] border-b-gray-300 text-[12px] flex justify-between">
                <span>
                    <span className='mr-[5px]'>Vitamin D {n.vitamin_d}mcg</span>
                </span>
                <span className='font-bold'>{n.vitamin_d_percentage}%</span>
            </div>
            <div className="py-[10px] mx-[15px] h-[26px] border-b-[1px] border-b-gray-300 text-[12px] flex justify-between">
                <span>
                    <span className='mr-[5px]'>Calcium {n.calcium}mg</span>
                </span>
                <span className='font-bold'>{n.calcium_percentage}%</span>
            </div>
            <div className="py-[10px] mx-[15px] h-[26px] border-b-[1px] border-b-gray-300 text-[12px] flex justify-between">
                <span>
                    <span className='mr-[5px]'>Iron {n.iron}mg</span>
                </span>
                <span className='font-bold'>{n.iron_percentage}%</span>
            </div>
            <div className="py-[10px] mx-[15px] h-[26px] border-b-[1px] border-b-gray-300 text-[12px] flex justify-between">
                <span>
                    <span className='mr-[5px]'>Potassium {n.potassium}mg</span>
                </span>
                <span className='font-bold'>{n.potassium_percentage}%</span>
            </div>
        </div>
    )
}
