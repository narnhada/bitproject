import React, { useState } from "react";

const Biyong2 = () => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colspan="2">월 고정비용</th>
            <th colspan="2">월 변동비용</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>항목</th>
            <th>월 비용</th>
            <th>항목</th>
            <th>월 비용</th>
          </tr>
          <tr>
            <th>
              월세<br></br>
              <small class="nmal">(월 임차료+ 관리비 + 실비)</small>
            </th>
            <td class="text-right">
              <strong class="largenum">95</strong> 만원
            </td>
            <th>
              재료비<br></br>
              <small class="nmal">(매출원가)</small>
            </th>
            <td class="text-right">
              <strong class="largenum">0</strong> 만원
            </td>
          </tr>
          <tr>
            <th>
              월세
              <br />
              <small class="nmal">(월 임차료+ 관리비 + 실비)</small>
            </th>
            <td class="text-right">
              <strong class="largenum">95</strong> 만원
            </td>
            <th>
              재료비
              <br />
              <small class="nmal">(매출원가)</small>
            </th>
            <td class="text-right">
              <strong class="largenum">0</strong> 만원
            </td>
          </tr>
          <tr>
            <th>
              초기투자비용에 대한 월 발생비용
              <br />
              <small class="nmal">
                = 감가상각비 + 대출금의 이자 + 총투자비 2%
              </small>
              <br />
              <small class="nmal">
                * 감가상각에 보증금은 포함되지 않습니다.
              </small>
            </th>
            <td class="text-right">
              <strong class="largenum">525</strong> 만원
            </td>
            <th></th>
            <td class="text-right"></td>
          </tr>
          <tr>
            <th>
              기타비용
              <br />
              <small class="nmal">
                (복리후생비 + 수도광열비 + 세금과 공과비+ 접대비 + 소모품 +
                마케팅비 + 교통비 + 통신비 + 지급수수료 등
              </small>
            </th>
            <td class="text-right">
              <strong class="largenum">400</strong> 만원
            </td>
            <th></th>
            <td class="text-right"></td>
          </tr>
          <tr>
            <th>소계</th>
            <td class="text-right">
              <strong class="largenum">1,099</strong> 만원
            </td>
            <th>소계</th>
            <td class="text-right">
              <strong class="largenum">34</strong> 만원
            </td>
          </tr>
          <tr class="bgpoint3">
            <th colspan="3">총 비용(고정비 + 변동비)</th>
            <td class="text-right">
              <strong class="largenum">1,133</strong> 만원
            </td>
          </tr>
          <tr>
            <td colspan="2">
              ※ 고정비용 : 판매량에 관계없이 월마다 꾸준히 지출되는 비용
              <br />
              ※ 인건비는 고정인건비(70%)와 변동인건비(30%)로 나누어 계산하였음
              <br />
              ※ 기타비용은 100% 고정비용으로 간주하여 계산하였음
              <br />※ 음식/서비스업종은 재료비를 기타비용에 포함(통계청
              집계기준)
            </td>
            <td colspan="2">※ 변동비용 : 판매량에 따라 월마다 달라지는 비용</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Biyong2;
