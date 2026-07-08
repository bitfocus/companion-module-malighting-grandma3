-- v2.0.0.5

function createQuickey(qkNum, quickey)
    -- Create Quickey
    Cmd('Store Quickey '..qkNum)
    Cmd('Set Quickey ' .. qkNum .. ' "Code" "' .. string.upper(quickey) ..'"')
end

function is_numeric(x)
    -- Check if numeric
    if tonumber(x) ~= nil then
        return true
    end
    return false
end

function main ()

    -- Array with all keys on the command wing
    keys = {'Highlight', 'Solo', 'Freeze', 'Preview', 'Blind', 'On', 'Move', 'Delete', 'Stomp', 'Select', 'Off', 'Copy', 'Align', 'Help', 'Goto', 'Fixture', 'Preset', 'Edit', 'Update', 'Channel', 'Sequence', 'Assign', 'Group', 'Cue', 'Time', 'Store', 'Plus', 'Thru', 'Minus', 'At', 'Please', 'Oops', 'Clear', 'Esc', 'Full'}

    -- Confirm modal, and explanation what to do
    if Confirm("CommandWing Quickey Creator", "Please enter startpoint for Quickey creation, there have to be " .. #keys .. " free keys, after the given number.") then
        
        -- Create input for the start index, with title and message
        local input = TextInput("CommandWing Quickey Creator","1")

        -- Check if feedback is a number, if not return 
        if is_numeric(input) then
            location = input

            -- Start Progressbar to see progress
            local progHandle = StartProgress("Creating Quickey")
            SetProgressRange(progHandle, 1, #keys)
            
            -- Create a key for every word in key list, update location, update progressbar, and brake for 0.01 seconds
            for i,v in ipairs(keys) do
                createQuickey(location, v)
                location = location + 1

                SetProgress(progHandle, i)
                coroutine.yield(0.01)
            end
            
            -- Close progressbar
            StopProgress(progHandle)
        else
            return
        end
        
        
        -- Setup OSC
        Cmd('Store OSC OSCData "OSC Companion Input" "PORT" "8081" "RECEIVE" "Yes" "RECEIVECOMMAND" "Yes" "DESTINATIONIP" "255.255.255.255"');
    else
        return
    end
end

return main

