import re
words = [];
for line in open('words.txt').readlines():
    for word in line.split(' '):
        words.append(re.sub(r'[^\w\s]', '', word.strip()));
# write a recursive line break algorithm;
# parents = []
print(words);
targetWidth = 15;
def lineBreak(words):
    totalCosts = [];
    for i in range(0, 1):
        lineCosts = [];
        for j in range(i+1, len(words)):
            c = cost(words[i:j]);
            if (c > 0): 
                lineCosts.append(c);
                print(c);
            else: break;
        print('line costs', lineCosts);
        if (len(lineCosts) > 0):
            totalCosts.append(min(lineCosts) + lineBreak(words[j:]));
    if (len(totalCosts) > 0):
        return min(totalCosts);
    else: return 0;

def cost(line):
    print(line);
    if (len(line) > targetWidth): return -1;
    return (targetWidth - len(' '.join(line)) + 1)**3;

    

x = lineBreak(words);
print(x);
