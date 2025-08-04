# create a dictionary
dict0 = {
    "name": "john",
    "age": 32
}

# add to it
dict0["address"] = "Maine"

# modify entry
dict0["name"] = "John"

# remove from it
# del dict0["address"]

# get an entry
# print(dict0["name"])

# check for key
# if "name" in dict0.keys():
#     print("true")

# check for a value
# if "John" in dict0.values():
#     print("true")

# print all the keys
# for key in dict0.keys():
#     print(key)

# print all the values
# for val in dict0.values():
#     print(val)

# print all the keys and values
# for key, val in dict0.items():
#     print(key, val)

print(dict0.items())
print(dict0)