# 데이터 분석을 위해 pandas를, 수치계산을 위해 numpy를, 시각화를 위해 seaborn을 불러옵니다.
import pandas as pd
import matplotlib.pyplot as plt
plt.rcParams.update({'font.size': 30})

import sys
print("ad")
plt.rc("font", family="gulim")
plt.rc("axes", unicode_minus=False)

df_Coffee=pd.read_csv("C:\\react\\project\\springbootdatabase\\src\\main\\java\\com\\springbootdatabase\\hellopython\\SeoulCoffeeShop_Local_dong.csv", sep=',', encoding='utf-8')
df_Coffee

df_Coffee["법정동명"].nunique()
df_Coffee["법정동명"].shape
df_Coffee["법정동명"].value_counts()

pivot = pd.pivot_table(data=df_Coffee,
               index=["시군구명", "법정동명","상세영업상태명"],
               values="영업상태수", aggfunc="sum")
pivot.head()

def GuGraph(a):
    pivot.loc[a].plot(kind='bar',figsize=(20, 20))
    plt.title("강남구  영업상태수")
    plt.xlabel("동별영업상태")
    plt.ylabel("영업상태수")
    plt.savefig("C:\\react\\project\\springbootdatabase\\src\\main\\resources\\static\\graph\\image1.png")
    print("Complete")

    return GuGraph

def DongGraph(a,b):
    pivot.loc[a, b].plot(kind='bar',figsize=(20, 20))
    plt.title(a + b + " 영업상태수")
    plt.xlabel("동별영업상태")
    plt.ylabel("영업상태수")
    plt.savefig("C:\\react\\project\\springbootdatabase\\src\\main\\resources\\static\\graph\\image2.png")
    print("Complete2")

    return DongGraph


if __name__ == '__main__':
    GuGraph(sys.argv[1])
    DongGraph(sys.argv[1],sys.argv[2])
