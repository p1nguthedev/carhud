local visible = true

CreateThread(function()
    local timer = 2000
    while true do
        Wait(timer)
        local veh = GetVehiclePedIsIn(PlayerPedId(), false)
        SetVehicleEngineOn(veh, true, true, true)
        if veh ~= 0 and GetIsVehicleEngineRunning(veh) == 1 then
            timer = 100
            if GetPedInVehicleSeat(veh, -1) == PlayerPedId() or visible == true then
                local speed = GetEntitySpeed(veh)
                if Config.SpeedUnit == "kmh" then
                    speed = speed * 3.6 
                elseif Config.SpeedUnit == "mph" then
                    speed = speed * 2.23694  
                end
                local data = {
                    Speed = speed,
                    SpeedUnit = Config.SpeedUnit,
                    rpm = GetVehicleCurrentRpm(veh),
                    Fuel = FuelExport(veh)
                }
                visible = true
                SendNUIMessage({ action = "show", data = data })
            else
                timer = 2000
                SendNUIMessage({ action = "hide" })
            end
        else
            timer = 2000
            SendNUIMessage({ action = "hide" })
            visible = true
        end
    end
end)