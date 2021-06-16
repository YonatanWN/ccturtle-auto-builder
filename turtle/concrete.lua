  currentslot = turtle.getSelectedSlot()
  while currentslot <= 16 do
    local item = turtle.getItemDetail()

    if(item ~= nil) then
      if(string.match(item["name"], '.*concrete_powder.*') ~= nil) then
        while turtle.getItemCount() ~= 0 do
          if(string.match(item["name"],  '.*concrete_powder.*') ~= nil) then
            print(string.match(item["name"],  '.*concrete_powder.*'))
            turtle.place()
            turtle.dig()
          else
            break
          end
        end
      end

    end
    currentslot = currentslot + 1
    turtle.select(currentslot)
  end
s
