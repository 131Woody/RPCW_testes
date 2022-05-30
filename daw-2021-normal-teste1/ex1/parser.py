import json
import re

#devolve os erros que tem no json e faz a segunda parte da primeira alinea

with open("registos.json") as f:
    pais = ' Pai: (.+);'
    #maes = '; Mae: (.+?)",'
    maes = '(?:Mae:\s)([a-zA-Z\séãçóêíÂ]+)'
    data = json.load(f)
    #print(data)
    for ele in data:
        ele["_id"] = ele["ref"].replace('/', '_')
        
        if p := re.search(pais, ele["title"]):
            ele["pai"] = p.group(1)
        else:
            ele["pai"] = "pai não conhecido"   
        
        if m := re.search(maes, ele["title"]):
            ele["mae"] = m.group(1)
        else:
            ele["mae"] = "mae não conhecida"   

        #print(ele["pai"])
        #print(ele["mae"])
        #print(ele["_id"])







#prepara o json para ser importado para o mongo - neste caso um objeto por linha separados por \n 
# no caso do ficheiro ser preparado como uma lista de objetos temos q usar o comando " -- jsonarray" ao importar po mongo no terminal
with open("registos_mongo.json", "w") as f:
    for ele in data:
        f.write("{")
        k = 0
        for i, j in ele.items():
            if k != len(ele) -1:
                f.write(f'"{i}":"{j}",')
                k+=1
            else: 
                f.write(f'"{i}":"{j}"')
        f.write("}")
        f.write("\n")