Config = {}

Config.SpeedUnit = 'kmh' -- default kmh/mph

function FuelExport(veh)
    return Entity(veh).state.fuel -- your fuel script - default ox_fuel
end