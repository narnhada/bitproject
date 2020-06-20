/*global kakao*/
import React, { useEffect, useState } from "react";
import $ from "jquery";
import "../css/map.css";
import axios from "axios";
import { FiArrowRightCircle, FiList } from "react-icons/fi";
const Map3 = () => {
  const [gu, setGu] = useState("");
  const [message, setMessage] = useState("");
  const [dong, setDong] = useState("개포동");
  const [list, setList] = useState(false);
  const [fa, setFa] = useState("");

  const onClick2 = (e) => {
    setList(true);
  };
  const seloption = (e) => {
    setFa(e.target.value);
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=5f5809befc934f9413253553bc2551f6&autoload=false&libraries=services,clusterer,drawing";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        // var el = document.getElementById("map");
        var jsondata;
        var mapContainer = document.getElementById("map"), // 지도를 표시할 div
          mapOption = {
            center: new kakao.maps.LatLng(
              window.sessionStorage.getItem("positionx"),
              window.sessionStorage.getItem("positiony")
            ), // 지도의 중심좌표
            level: window.sessionStorage.getItem("level"), // 지도의 확대 레벨
          };

        var map = new kakao.maps.Map(mapContainer, mapOption);
        var customOverlay = new kakao.maps.CustomOverlay();
        var clusterer = new kakao.maps.MarkerClusterer({
          map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
          averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel: 5, // 클러스터 할 최소 지도 레벨
          disableClickZoom: true, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
        });
        var content;
        // 데이터를 가져오기 위해 jQuery를 사용합니다
        // 데이터를 가져와 마커를 생성하고 클러스터러 객체에 넘겨줍니다
        axios
          .get("/json/seoulCafe.json")
          .then((data) => {
            jsondata = data.data.positions;

            var markers = $(data.data.positions).map(function (i, position) {
              if (window.sessionStorage.getItem("dong") === position.dong) {
                if (fa === position.class) {
                  customOverlay.setContent(
                    '<div class="wrap">' +
                      '    <div class="info">' +
                      '        <div class="title">' +
                      position.name +
                      '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
                      "        </div>" +
                      '        <div class="body">' +
                      '            <div class="desc">' +
                      '                <div class="ellipsis">' +
                      position.address +
                      "</div>" +
                      "            </div>" +
                      "        </div>" +
                      "    </div>" +
                      "</div>"
                  );
                  return new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(position.x, position.y),
                  });
                }
              }
            });

            // 클러스터러에 마커들을 추가합니다
            clusterer.addMarkers(markers);
            kakao.maps.event.addListener(clusterer, "clusterclick", function (
              cluster
            ) {
              // 현재 지도 레벨에서 1레벨 확대한 레벨
              var level = map.getLevel() - 1;

              // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
              map.setLevel(level, { anchor: cluster.getCenter() });
            });

            // 마커 위에 커스텀오버레이를 표시합니다
            // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
            console.log(customOverlay.getContent());
            var overlay = new kakao.maps.CustomOverlay({
              map: map,
              position: markers.getPosition(),
              content: customOverlay.getContent(),
            });

            // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
            kakao.maps.event.addListener(markers, "click", function () {
              overlay.setMap(map);
            });

            // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
            function closeOverlay() {
              overlay.setMap(null);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    };
  }, [fa]);

  const OnSubmit = (e) => {
    e.preventDefault();
    window.sessionStorage.setItem("class", fa);
    const post = {
      gu: window.sessionStorage.getItem("gu"),
      dong: dong,
    };
    fetch("/json1", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.text())
      .then((message) => {
        console.log(message);
        window.sessionStorage.setItem("message", message);
        window.location.replace("/graph1");
      });
  };
  return (
    <>
      <div className="map" id="map"></div>
      <div className="icons">
        <FiList onClick={onClick2}></FiList>
        <FiArrowRightCircle onClick={OnSubmit}></FiArrowRightCircle>
        {list ? (
          <div className="list">
            <select onClick={seloption}>
              <option></option>
              <option name="커피전문점/카페/다방" value="커피전문점/카페/다방">
                커피전문점/카페/다방
              </option>
              <option name="기능" value="기능">
                기능
              </option>
              <option name="구현" value="구현">
                구현
              </option>
              <option name="중" value="중">
                중
              </option>
            </select>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
};

export default Map3;
