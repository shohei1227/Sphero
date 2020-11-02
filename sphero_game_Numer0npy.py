#入力値は０～２（easy,normal,hard）
#2桁or3桁or4桁の、数が重複しないような1～9の数字を用いた数値を発生させる。



import random

def SetNumber():
    a = random.randrange(1,9)
    return a
def Number(p):
  number = [0]*p
  for i in range(p):
    number[i] = SetNumber()
  #print("number = " +str(number))
  return number
def Judge(m):
  sum1 = 0
  sum2 = 0
  for j in range(0,m-1):
    for k in range(j+1,m):
      #print(j,k)
      sum1 += 1
      if num[j] != num[k]:
        sum2 += 1
  return [sum1,sum2]

N = int(input())
#print("N = "+str(N))
mode = N + 2
#print("mode = "+str(mode))
while True:
  num = Number(mode)
  sum = Judge(mode)
  #print("sum[0],sum[1] = " + str(sum[0]) + "," + str(sum[1]))
  if sum[0] == sum[1]:
    break
print("decided number is "+str(num))
