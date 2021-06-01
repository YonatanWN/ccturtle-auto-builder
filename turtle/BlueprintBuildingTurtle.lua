--function
function moveTurtleInX(y)
  if y%2 == 0 then
    turtle.forward()
  else
    turtle.back()
  end
end
function moveTurtleInY(y,x)
  if x%2==1 and y%2 ==1 then
    turtle.turnRight()
    turtle.forward()
    turtle.turnLeft()
  elseif x%2==0 and y%2 ==1 then
    turtle.turnLeft()
    turtle.forward()
    turtle.turnRight()
  elseif x%2==1 and y%1 == 0 then
    turtle.turnLeft()
    turtle.forward()
    turtle.turnRight()
  else
    turtle.turnRight()
    turtle.forward()
    turtle.turnLeft()
  end
end
function buildArray(ylength, xlength, zlength)
  local x = {}
  for i=1,ylength do
   x[i] = {}
   for j=1,xlength do
      x[i][j] = {}
      for k=1,zlength do
         x[i][j][k] = 0
      end
   end
  end
  return x
end

function mysplit(inputstr, sep)
  -- Credit: https://stackoverflow.com/questions/1426954/split-string-in-lua
        if sep == nil then
                sep = "%s"
        end
        local t={}
        for str in string.gmatch(inputstr, "([^"..sep.."]+)") do
                table.insert(t, str)
        end
        return t
end

function refuel()
  for i=1, 16 do
    turtle.select(i)
    if turtle.refuel(0) then
        turtle.refuel(turtle.getItemCount(i))
    end
  end
end

function getItemIndex(itemName)

  --Credit: https://github.com/ottomated/turtle-gambit/blob/master/turtle/startup.lua
	for slot = 1, 16, 1 do
		local item = turtle.getItemDetail(slot)
		if(item ~= nil) then
			if(item["name"] == itemName) then
				return slot
			end
		end
	end
end
 --Main Function
 xmax = 3
 zmax = 3
 ymax = 2



 blueprint = buildArray(ymax,xmax,zmax)

 blueprint[1][1][1] = "minecraft:stone"
 blueprint[1][1][2] = "minecraft:stone"
 blueprint[1][1][3] = "minecraft:stone"
 blueprint[1][2][1] = "minecraft:stone"
 blueprint[1][2][2] = "minecraft:stone"
 blueprint[1][2][3] = "minecraft:stone"
 blueprint[1][3][1] = "minecraft:stone"
 blueprint[1][3][2] = "minecraft:stone"
 blueprint[1][3][3] = "minecraft:stone"
 blueprint[2][1][1] = "minecraft:stone"
 blueprint[2][1][2] = "minecraft:stone"
 blueprint[2][1][3] = "minecraft:stone"
 blueprint[2][2][1] = "minecraft:stone"
 blueprint[2][2][2] = "minecraft:stone"
 blueprint[2][2][3] = "minecraft:stone"
 blueprint[2][3][1] = "minecraft:stone"
 blueprint[2][3][2] = nill
 blueprint[2][3][3] = "minecraft:stone"
 refuel()
 for yiterator=1,ymax do
   for xiterator=1, xmax do
       for ziterator=1, zmax do

         local item = turtle.getItemDetail(turtle.getSelectedSlot())
         if( blueprint[yiterator][xiterator][ziterator] ~= nill and (item == nil or item["name"] ~= blueprint[yiterator][xiterator][ziterator])) then
          turtle.select(getItemIndex(blueprint[yiterator][xiterator][ziterator]))
        end
        if blueprint[yiterator][xiterator][ziterator] ~= nill then
         turtle.placeDown()
         end
         if ziterator ~= zmax then
          moveTurtleInY(yiterator,xiterator)
         end
       end
      if xiterator ~= xmax then
        moveTurtleInX(yiterator)
      end
   end
   if yiterator ~= ymax then
    turtle.up()
   end
end
