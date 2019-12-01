import datetime
import sys

def run(lat, long, bays, occ):
    long_deviate = 1
    lat_deviate = 1
    file = open("data.txt", "r")
    the_line = ""
    the_long = 0
    the_id = ""
    the_quant = 0
    roads = 1613
    for line in file:
        words = line.split(",")
        if not len(words) == 31:
            continue
        try:
            upper_long = float(words[13]) + long_deviate
            lower_long = float(words[13]) - long_deviate
            upper_lat = float(words[12]) + lat_deviate
            lower_lat = float(words[12]) - lat_deviate
            if in_range(lower_long, lower_lat, upper_long, upper_lat, long, lat):
                the_line = line
                the_long = float(words[13])
                the_id = words[0]
                the_quant = int(words[20])
                # print("yes!")
                break
        except:
            continue
    # print(the_line)
    file.close()
    file = open("data.txt", "r")
    closest_dist = -1
    closest_quant = 0
    for line in file:
        words = line.split(",")
        if words[0] == the_id:
            continue
        try:
            cur_dist = float(words[13]) - the_long
        except:
            continue
        if cur_dist < 0:
            continue
        if cur_dist > closest_dist:
            closest_quant = int(words[20])
            closest_dist = cur_dist
    # print(closest_dist)
    # print(closest_quant)
    prob_taxi = 108200/ (110332760/730)
    # print(prob_taxi)
    n = the_quant - closest_quant
    if n < 0:
        n *= -1
    # n = the_quant - diff
    now = datetime.datetime.now().hour
    multiplier = 0.5
    if (now >= 6 and now <= 11) or (now >= 17 and now <= 23):
        multiplier = 0.5
    if now > 11 and now < 17:
        multiplier = 0.75
    number_of_cars = ((n // 24)//60) * multiplier
    # print('{0:.10f}'.format(p_taxi))
    # prob_taxi = prob_taxi / number_of_cars
    # print(number_of_cars)
    # print(prob_taxi)
    total_prob = 0
    free = bays - occ
    for i in range(free):
        total_prob += binomial2(number_of_cars, 1-prob_taxi, i)
    if total_prob > 1:
        total_prob = 1.0
    print(total_prob)
    # print(binomial2(bays, p_park, bays-occ)*100)
    # return total_prob

def in_range(l_long, l_lat, u_long, u_lat, val_long, val_lat):
    if val_lat > l_lat and val_lat < u_lat:
        return val_long > l_long and val_long < u_long

def binomial(n, p):
    return (p ** 1)

def binomial2(n, p, r):
    return (p ** r)*((1-p) ** (n-r))*comb(n, r)

def comb(n, r):
    return fact(n) / (fact(n-r)*fact(r))

def fact(n):
    fact = 1
    while (n > 0):
        fact = fact * n
        n = n - 1
    return fact

args = sys.argv
lat = float(args[1])
long = float(args[2])
bays = int(args[3])
occ = int(args[4])
run(lat, long, bays, occ)
# "51.52839696" "-0.11927979" "5" "5"