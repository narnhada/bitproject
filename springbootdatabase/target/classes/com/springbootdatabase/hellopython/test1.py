import pandas as pd
import matplotlib.pyplot as plt


i=0
total=pd.read_csv("C:\\Users\\BIT\\Documents\\카카오톡 받은 파일\\인구분석\\최종상권소비소득.csv", sep=',', encoding='utf-8' )

print(total["시군구명"].nunique()) # 겹침 제거 
print(total["시군구명"].shape) # 그냥 길이 
print(total["시군구명"].value_counts()) # 몇개인지 


# print(total["시군구명"][0])
# total["지출_월_금액"]= total["지출_총금액"].div(12)
# print(total["지출_월_금액"])
# print(total["월_평균_소득_금액"])

print(total["소득_실_지출_월"])
# pivot = pd.pivot_table(data=total,
#                index=["시군구명", "행정동명"],
#                values="소득_실_지출_월", aggfunc="sum")
print(total["소득_실_지출_월"])
# for i in total["시군구명"].shape:
plt.bar(total["시군구명"],total["소득_실_지출_월"])
plt.title("종로구" + "청운효자동" + " 소득_실_지출_월")
plt.xlabel("소득")
plt.ylabel("지출")
plt.savefig("C:\\react\\project\\springbootdatabase\\src\\main\\resources\\static\\graph\\소득.png")
print("Complete2")