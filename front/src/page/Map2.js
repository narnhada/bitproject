/*global kakao*/
import React, { useEffect, useState } from "react";
import a from "../json/dong1.geojson";
import $ from "jquery";
import "../css/map.css";
import { Link } from "react-router-dom";
import b from "../json/Cafe.geojson";
import c from "../json/seoulCafe.json";
import { FiList } from "react-icons/fi";

const Map2 = ({ gu1 }) => {
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
        var mapContainer = document.getElementById("map"), // 지도를 표시할 div
          mapOption = {
            center: new kakao.maps.LatLng(37.536, 127.0), // 지도의 중심좌표
            level: 7, // 지도의 확대 레벨
          };

        var map = new kakao.maps.Map(mapContainer, mapOption);
        var customOverlay = new kakao.maps.CustomOverlay();
        var clusterer = new kakao.maps.MarkerClusterer({
          map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
          averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel: 3, // 클러스터 할 최소 지도 레벨
        });

        // $.get(b, function(data) {
        //   //var data = geojson.features;
        //     console.log("b");
        //   // 데이터에서 좌표 값을 가지고 마커를 표시합니다
        //   // 마커 클러스터러로 관리할 마커 객체는 생성할 때 지도 객체를 설정하지 않습니다
        //   var markers = $(data.positions).map(function (i, position) {
        //       console.log(position.gu);
        //     if (window.sessionStorage.getItem("gu") === position.gu)
        //       return new kakao.maps.Marker({
        //         position: new kakao.maps.LatLng(position.x, position.y),
        //       });
        //   });

        //   // 클러스터러에 마커들을 추가합니다
        //   clusterer.addMarkers(markers);
        // });
        // 데이터를 가져오기 위해 jQuery를 사용합니다
        // 데이터를 가져와 마커를 생성하고 클러스터러 객체에 넘겨줍니다
        function ad(geojson1){
          var data1 = geojson1.features;
          var markers1 = $.each(data1, function (i, val1) {
            if (window.sessionStorage.getItem("gu") === val1.properties.gu)
              return new kakao.maps.Marker({
                position: new kakao.maps.LatLng(
                  val1.geometry.coordinates[0],
                  val1.geometry.coordinates[1]
                ),
              });
          });

          // 클러스터러에 마커들을 추가합니다
          clusterer.addMarkers(markers1);
        }
        $.getJSON(b, 
          function (geojson) {
          console.log("b");
          var data1 = geojson.features;
          var markers1 = $.each(data1, function (i, val1) {
            if (window.sessionStorage.getItem("gu") === val1.properties.gu)
              return new kakao.maps.Marker({
                position: new kakao.maps.LatLng(
                  val1.geometry.coordinates[0],
                  val1.geometry.coordinates[1]
                ),
              });
          });

          // 클러스터러에 마커들을 추가합니다
          clusterer.addMarkers(markers1);
        });

        $.getJSON(a, function (geojson) {
          console.log("a");
          var data = geojson.features;
          var coordinates = []; //좌표 저장할 배열
          var name = ""; //행정 구 이름
          var EMD_CD = "";
          var regex = new RegExp(gu1);

          $.each(data, function (index, val) {
            coordinates = val.geometry.coordinates;
            name = val.properties.EMD_KOR_NM;
            EMD_CD = val.properties.EMD_CD;

            if (regex.test(EMD_CD)) {
              displayArea(coordinates, name);
            }
          });
        });

        var polygons = []; //function 안 쪽에 지역변수로 넣으니깐 폴리곤 하나 생성할 때마다 배열이 비어서 클릭했을 때 전체를 못 없애줌.  그래서 전역변수로 만듦.

        //행정구역 폴리곤
        function displayArea(coordinates, name) {
          var path = []; //폴리곤 그려줄 path
          var points = []; //중심좌표 구하기 위한 지역구 좌표들

          $.each(coordinates[0][0], function (index, coordinate) {
            //console.log(coordinates)를 확인해보면 보면 [0]번째에 배열이 주로 저장이 됨.  그래서 [0]번째 배열에서 꺼내줌.

            var point = new Object();
            point.x = coordinate[1];
            point.y = coordinate[0];
            points.push(point);
            path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0])); //new daum.maps.LatLng가 없으면 인식을 못해서 path 배열에 추가
          });

          // 다각형을 생성합니다
          var polygon = new kakao.maps.Polygon({
            map: map, // 다각형을 표시할 지도 객체
            path: path,
            strokeWeight: 2,
            strokeColor: "#004c80",
            strokeOpacity: 0.8,
            fillColor: "#fff",
            fillOpacity: 0.7,
          });

          polygons.push(polygon); //폴리곤 제거하기 위한 배열

          // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
          // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
          kakao.maps.event.addListener(polygon, "mouseover", function (
            mouseEvent
          ) {
            polygon.setOptions({
              fillColor: "#09f",
            });

            customOverlay.setContent('<div class="area">' + name + "</div>");

            customOverlay.setPosition(mouseEvent.latLng);
            customOverlay.setMap(map);
          });

          // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
          kakao.maps.event.addListener(polygon, "mousemove", function (
            mouseEvent
          ) {
            customOverlay.setPosition(mouseEvent.latLng);
          });

          // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
          // 커스텀 오버레이를 지도에서 제거합니다
          kakao.maps.event.addListener(polygon, "mouseout", function () {
            polygon.setOptions({
              fillColor: "#fff",
            });
            customOverlay.setMap(null);
          });

          // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 해당 지역 확대을 확대합니다.
          kakao.maps.event.addListener(polygon, "click", function () {
            // 현재 지도 레벨에서 2레벨 확대한 레벨
            var level = map.getLevel() - 3;
            setDong(name);
            // 지도를 클릭된 폴리곤의 중앙 위치를 기준으로 확대합니다
            map.setLevel(level, {
              anchor: centroid(points),
              animate: {
                duration: 350, //확대 애니메이션 시간
              },
            });

            deletePolygon(polygons); //폴리곤 제거
          });
        }
        function centroid(points) {
          var i, j, len, p1, p2, f, area, x, y;

          area = x = y = 0;

          for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
            p1 = points[i];
            p2 = points[j];

            f = p1.y * p2.x - p2.y * p1.x;
            x += (p1.x + p2.x) * f;
            y += (p1.y + p2.y) * f;
            area += f * 3;
          }
        }
        function deletePolygon(polygons) {
          for (var i = 0; i < polygons.length; i++) {
            polygons[i].setMap(null);
          }
          polygons = [];
        }
      });
    };
  }, []);

  const OnSubmit = (e) => {
    e.preventDefault();
    const post = {
      gu: window.sessionStorage.getItem("gu"),
      dong: dong,
    };
    fetch("/map", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.text())
      .then((message) => {
        window.sessionStorage.setItem("message", message);
        window.location.replace("/graph1");
      });
  };
  return (
    <>
      <div className="map" id="map"></div>

      <form onSubmit={OnSubmit}>
        <input type="submit" value="전송"></input>
      </form>
      {/* <div className="icons">
        <FiList onClick={onClick2}></FiList>

        {list ? (
          <div className="list">
            <select onClick={seloption}>
              <option></option>
              <option name="커피숍" value="커피숍">
                커피숍
              </option>
              <option name="다방" value="다방">
                다방
              </option>
              <option name="전통찻집" value="전통찻집">
                전통찻집
              </option>
              <option name="떡카페" value="떡카페">
                떡카페
              </option>
            </select>
          </div>
        ) : (
          <p></p>
        )}
      </div> */}
    </>
  );
};

export default Map2;
