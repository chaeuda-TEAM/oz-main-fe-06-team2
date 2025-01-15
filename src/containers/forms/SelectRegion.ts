interface FirstRegion {
  value: string;
  name: string;
}

interface SecondRegion {
  value: string;
  name: string;
  latitude: number;
  longitude: number;
}

export const FirstSelectRegion: FirstRegion[] = [
  { value: 'default', name: '시/도' },
  { value: '경기', name: '경기' },
  { value: '부산', name: '부산' },
  { value: '인천', name: '인천' },
  { value: '강원', name: '강원' },
  { value: '경북', name: '경북' },
  { value: '경남', name: '경남' },
  { value: '대전', name: '대전' },
  { value: '세종', name: '세종' },
  { value: '전북', name: '전북' },
  { value: '전남', name: '전남' },
  { value: '광주', name: '광주' },
  { value: '충북', name: '충북' },
  { value: '충남', name: '충남' },
  { value: '대구', name: '대구' },
  { value: '울산', name: '울산' },
  { value: '제주', name: '제주' },
];

export const SecondSelectRegion: Record<string, SecondRegion[]> = {
  default: [{ value: '-', name: '-', latitude: 37.683834, longitude: 126.776557 }],
  부산: [
    { value: '해운대구', name: '해운대구', latitude: 35.163111, longitude: 129.163585 },
    { value: '기장군', name: '기장군', latitude: 35.24462, longitude: 129.2225 },
    { value: '수영구', name: '수영구', latitude: 35.145402, longitude: 129.113569 },
    { value: '강서구', name: '강서구', latitude: 35.212166, longitude: 128.982748 },
    { value: '금정구', name: '금정구', latitude: 35.243025, longitude: 129.092583 },
    { value: '남구', name: '남구', latitude: 35.136515, longitude: 129.084114 },
    { value: '동구', name: '동구', latitude: 35.129144, longitude: 129.045423 },
    { value: '동래구', name: '동래구', latitude: 35.205017, longitude: 129.094028 },
    { value: '부산진구', name: '부산진구', latitude: 35.163185, longitude: 129.053319 },
    { value: '북구', name: '북구', latitude: 35.197139, longitude: 128.991885 },
    { value: '사상구', name: '사상구', latitude: 35.152498, longitude: 128.991467 },
    { value: '사하구', name: '사하구', latitude: 35.104663, longitude: 128.975753 },
    { value: '서구', name: '서구', latitude: 35.097974, longitude: 129.024505 },
    { value: '연제구', name: '연제구', latitude: 35.176159, longitude: 129.07977 },
    { value: '영도구', name: '영도구', latitude: 35.091366, longitude: 129.067432 },
    { value: '중구', name: '중구', latitude: 35.106233, longitude: 129.032418 },
  ],
  대구: [
    { value: '군위군', name: '군위군', latitude: 36.243127, longitude: 128.57289 },
    { value: '남구', name: '남구', latitude: 35.845996, longitude: 128.597286 },
    { value: '달서구', name: '달서구', latitude: 35.829974, longitude: 128.532974 },
    { value: '달성군', name: '달성군', latitude: 35.774746, longitude: 128.431377 },
    { value: '동구', name: '동구', latitude: 35.886606, longitude: 128.635568 },
    { value: '북구', name: '북구', latitude: 35.885876, longitude: 128.582895 },
    { value: '서구', name: '서구', latitude: 35.871419, longitude: 128.559017 },
    { value: '수성구', name: '수성구', latitude: 35.858166, longitude: 128.630701 },
    { value: '중구', name: '중구', latitude: 35.869102, longitude: 128.606049 },
  ],
  인천: [
    { value: '강화군', name: '강화군', latitude: 37.746215, longitude: 126.487889 },
    { value: '계양구', name: '계양구', latitude: 37.537374, longitude: 126.737751 },
    { value: '남동구', name: '남동구', latitude: 37.409914, longitude: 126.701844 },
    { value: '동구', name: '동구', latitude: 37.473936, longitude: 126.643285 },
    { value: '미추홀구', name: '미추홀구', latitude: 37.463588, longitude: 126.650258 },
    { value: '부평구', name: '부평구', latitude: 37.507069, longitude: 126.721881 },
    { value: '서구', name: '서구', latitude: 37.545301, longitude: 126.675758 },
    { value: '연수구', name: '연수구', latitude: 37.410165, longitude: 126.677839 },
    { value: '옹진군', name: '옹진군', latitude: 37.446413, longitude: 126.636408 },
    { value: '중구', name: '중구', latitude: 37.473731, longitude: 126.621862 },
  ],
  광주: [
    { value: '광산구', name: '광산구', latitude: 35.139542, longitude: 126.793683 },
    { value: '남구', name: '남구', latitude: 35.13303, longitude: 126.902601 },
    { value: '동구', name: '동구', latitude: 35.146054, longitude: 126.923178 },
    { value: '북구', name: '북구', latitude: 35.174134, longitude: 126.911694 },
    { value: '서구', name: '서구', latitude: 35.151511, longitude: 126.890214 },
  ],
  대전: [
    { value: '대덕구', name: '대덕구', latitude: 36.346984, longitude: 127.414282 },
    { value: '동구', name: '동구', latitude: 36.311539, longitude: 127.454876 },
    { value: '서구', name: '서구', latitude: 36.35743, longitude: 127.383458 },
    { value: '유성구', name: '유성구', latitude: 36.362321, longitude: 127.356123 },
    { value: '중구', name: '중구', latitude: 36.325419, longitude: 127.421425 },
  ],
  울산: [
    { value: '남구', name: '남구', latitude: 35.544571, longitude: 129.330044 },
    { value: '동구', name: '동구', latitude: 35.504805, longitude: 129.416748 },
    { value: '북구', name: '북구', latitude: 35.582764, longitude: 129.361172 },
    { value: '울주군', name: '울주군', latitude: 35.522208, longitude: 129.242134 },
    { value: '중구', name: '중구', latitude: 35.569631, longitude: 129.332764 },
  ],
  세종: [{ value: '-', name: '-', latitude: 36.4800121, longitude: 127.2890691 }],
  경기: [
    { value: '고양', name: '고양', latitude: 37.6559107, longitude: 126.8350539 },
    { value: '가평', name: '가평', latitude: 37.831564, longitude: 127.509702 },
    { value: '과천', name: '과천', latitude: 37.429246, longitude: 126.987684 },
    { value: '광명', name: '광명', latitude: 37.478591, longitude: 126.8647619 },
    { value: '광주', name: '광주', latitude: 37.4294306, longitude: 127.2550476 },
    { value: '구리', name: '구리', latitude: 37.5943275, longitude: 127.1295191 },
    { value: '군포', name: '군포', latitude: 37.3616703, longitude: 126.9350702 },
    { value: '김포', name: '김포', latitude: 37.6150156, longitude: 126.7155221 },
    { value: '남양주', name: '남양주', latitude: 37.6360028, longitude: 127.2165279 },
    { value: '동두천', name: '동두천', latitude: 37.903436, longitude: 127.0605075 },
    { value: '부천', name: '부천', latitude: 37.5034138, longitude: 126.7660309 },
    { value: '성남', name: '성남', latitude: 37.4449168, longitude: 127.1388684 },
    { value: '수원', name: '수원', latitude: 37.2635727, longitude: 127.0286009 },
    { value: '시흥', name: '시흥', latitude: 37.3799465, longitude: 126.8030635 },
    { value: '안산', name: '안산', latitude: 37.3218778, longitude: 126.8308848 },
    { value: '안성', name: '안성', latitude: 37.007983, longitude: 127.279777 },
    { value: '안양', name: '안양', latitude: 37.3942871, longitude: 126.9567534 },
    { value: '양주', name: '양주', latitude: 37.7855701, longitude: 127.0458437 },
    { value: '양평', name: '양평', latitude: 37.491282, longitude: 127.487561 },
    { value: '여주', name: '여주', latitude: 37.298017, longitude: 127.637272 },
    { value: '연천', name: '연천', latitude: 38.096523, longitude: 127.07461 },
    { value: '오산', name: '오산', latitude: 37.149818, longitude: 127.077211 },
    { value: '용인', name: '용인', latitude: 37.2410864, longitude: 127.1775537 },
    { value: '의왕', name: '의왕', latitude: 37.344246, longitude: 126.968278 },
    { value: '의정부', name: '의정부', latitude: 37.738098, longitude: 127.0337764 },
    { value: '이천', name: '이천', latitude: 37.2722396, longitude: 127.4350701 },
    { value: '파주', name: '파주', latitude: 37.759866, longitude: 126.7799505 },
    { value: '평택', name: '평택', latitude: 36.9921012, longitude: 127.1129342 },
    { value: '포천', name: '포천', latitude: 37.894915, longitude: 127.200375 },
    { value: '하남', name: '하남', latitude: 37.539299, longitude: 127.214859 },
    { value: '화성', name: '화성', latitude: 37.1994597, longitude: 126.8311688 },
  ],
  강원: [
    { value: '강릉', name: '강릉', latitude: 37.751853, longitude: 128.876017 },
    { value: '고성', name: '고성', latitude: 38.379939, longitude: 128.467354 },
    { value: '동해', name: '동해', latitude: 37.524946, longitude: 129.114212 },
    { value: '삼척', name: '삼척', latitude: 37.449987, longitude: 129.165479 },
    { value: '속초', name: '속초', latitude: 38.207032, longitude: 128.591866 },
    { value: '양구', name: '양구', latitude: 38.110037, longitude: 127.989451 },
    { value: '양양', name: '양양', latitude: 38.075374, longitude: 128.619059 },
    { value: '영월', name: '영월', latitude: 37.183507, longitude: 128.46173 },
    { value: '원주', name: '원주', latitude: 37.342219, longitude: 127.920073 },
    { value: '인제', name: '인제', latitude: 38.069439, longitude: 128.170696 },
    { value: '정선', name: '정선', latitude: 37.380669, longitude: 128.661089 },
    { value: '철원', name: '철원', latitude: 38.146506, longitude: 127.313872 },
    { value: '춘천', name: '춘천', latitude: 37.881315, longitude: 127.729971 },
    { value: '태백', name: '태백', latitude: 37.164034, longitude: 128.985578 },
    { value: '평창', name: '평창', latitude: 37.370479, longitude: 128.389966 },
    { value: '홍천', name: '홍천', latitude: 37.69687, longitude: 127.888581 },
    { value: '화천', name: '화천', latitude: 38.106224, longitude: 127.708066 },
    { value: '횡성', name: '횡성', latitude: 37.491744, longitude: 127.985097 },
  ],
  충북: [
    { value: '괴산', name: '괴산', latitude: 36.815065, longitude: 127.78688 },
    { value: '단양', name: '단양', latitude: 36.984519, longitude: 128.365469 },
    { value: '보은', name: '보은', latitude: 36.489439, longitude: 127.729405 },
    { value: '영동', name: '영동', latitude: 36.174865, longitude: 127.783324 },
    { value: '옥천', name: '옥천', latitude: 36.306613, longitude: 127.571409 },
    { value: '음성', name: '음성', latitude: 36.940365, longitude: 127.690886 },
    { value: '제천', name: '제천', latitude: 37.132434, longitude: 128.190942 },
    { value: '증평', name: '증평', latitude: 36.785184, longitude: 127.58149 },
    { value: '진천', name: '진천', latitude: 36.854959, longitude: 127.435451 },
    { value: '청주', name: '청주', latitude: 36.642434, longitude: 127.489032 },
    { value: '충주', name: '충주', latitude: 36.991017, longitude: 127.925963 },
  ],
  충남: [
    { value: '계룡', name: '계룡', latitude: 36.274411, longitude: 127.248705 },
    { value: '공주', name: '공주', latitude: 36.446533, longitude: 127.119258 },
    { value: '금산', name: '금산', latitude: 36.108864, longitude: 127.487141 },
    { value: '논산', name: '논산', latitude: 36.187376, longitude: 127.098741 },
    { value: '당진', name: '당진', latitude: 36.88994, longitude: 126.64584 },
    { value: '보령', name: '보령', latitude: 36.333419, longitude: 126.613285 },
    { value: '부여', name: '부여', latitude: 36.275835, longitude: 126.909739 },
    { value: '서산', name: '서산', latitude: 36.785143, longitude: 126.450286 },
    { value: '서천', name: '서천', latitude: 36.080416, longitude: 126.69128 },
    { value: '아산', name: '아산', latitude: 36.789764, longitude: 127.002464 },
    { value: '예산', name: '예산', latitude: 36.681555, longitude: 126.844752 },
    { value: '천안', name: '천안', latitude: 36.815133, longitude: 127.113872 },
    { value: '청양', name: '청양', latitude: 36.458741, longitude: 126.802365 },
    { value: '태안', name: '태안', latitude: 36.745606, longitude: 126.29797 },
    { value: '홍성', name: '홍성', latitude: 36.601465, longitude: 126.66165 },
  ],
  전북: [
    { value: '고창', name: '고창', latitude: 35.435832, longitude: 126.702005 },
    { value: '군산', name: '군산', latitude: 35.967615, longitude: 126.736646 },
    { value: '김제', name: '김제', latitude: 35.803547, longitude: 126.88087 },
    { value: '남원', name: '남원', latitude: 35.41635, longitude: 127.390469 },
    { value: '무주', name: '무주', latitude: 36.007085, longitude: 127.660769 },
    { value: '부안', name: '부안', latitude: 35.731577, longitude: 126.734976 },
    { value: '순창', name: '순창', latitude: 35.374326, longitude: 127.137599 },
    { value: '완주', name: '완주', latitude: 35.891146, longitude: 127.152066 },
    { value: '익산', name: '익산', latitude: 35.94828, longitude: 126.957599 },
    { value: '임실', name: '임실', latitude: 35.617714, longitude: 127.28914 },
    { value: '장수', name: '장수', latitude: 35.647475, longitude: 127.520728 },
    { value: '전주', name: '전주', latitude: 35.824189, longitude: 127.148006 },
    { value: '정읍', name: '정읍', latitude: 35.569956, longitude: 126.855834 },
    { value: '진안', name: '진안', latitude: 35.791799, longitude: 127.42487 },
  ],
  전남: [
    { value: '강진', name: '강진', latitude: 34.642057, longitude: 126.767134 },
    { value: '고흥', name: '고흥', latitude: 34.611104, longitude: 127.284725 },
    { value: '곡성', name: '곡성', latitude: 35.282018, longitude: 127.292338 },
    { value: '광양', name: '광양', latitude: 34.940642, longitude: 127.69588 },
    { value: '구례', name: '구례', latitude: 35.202487, longitude: 127.462867 },
    { value: '나주', name: '나주', latitude: 35.015903, longitude: 126.71099 },
    { value: '담양', name: '담양', latitude: 35.321385, longitude: 126.988794 },
    { value: '목포', name: '목포', latitude: 34.811835, longitude: 126.392184 },
    { value: '무안', name: '무안', latitude: 34.990442, longitude: 126.481673 },
    { value: '보성', name: '보성', latitude: 34.771407, longitude: 127.079996 },
    { value: '순천', name: '순천', latitude: 34.950637, longitude: 127.487214 },
    { value: '신안', name: '신안', latitude: 34.833182, longitude: 126.38131 },
    { value: '여수', name: '여수', latitude: 34.760374, longitude: 127.662222 },
    { value: '영광', name: '영광', latitude: 35.277698, longitude: 126.511629 },
    { value: '영암', name: '영암', latitude: 34.800186, longitude: 126.696778 },
    { value: '완도', name: '완도', latitude: 34.311006, longitude: 126.755 },
    { value: '장성', name: '장성', latitude: 35.301861, longitude: 126.784735 },
    { value: '장흥', name: '장흥', latitude: 34.68153, longitude: 126.906994 },
    { value: '진도', name: '진도', latitude: 34.486873, longitude: 126.263494 },
    { value: '함평', name: '함평', latitude: 35.06588, longitude: 126.516578 },
    { value: '해남', name: '해남', latitude: 34.573252, longitude: 126.598939 },
    { value: '화순', name: '화순', latitude: 35.064556, longitude: 126.986444 },
  ],
  경북: [
    { value: '경산', name: '경산', latitude: 35.825009, longitude: 128.741474 },
    { value: '경주', name: '경주', latitude: 35.856172, longitude: 129.224777 },
    { value: '고령', name: '고령', latitude: 35.726657, longitude: 128.262805 },
    { value: '구미', name: '구미', latitude: 36.119598, longitude: 128.34434 },
    { value: '김천', name: '김천', latitude: 36.139745, longitude: 128.113572 },
    { value: '문경', name: '문경', latitude: 36.586564, longitude: 128.186352 },
    { value: '봉화', name: '봉화', latitude: 36.892732, longitude: 128.732488 },
    { value: '상주', name: '상주', latitude: 36.410913, longitude: 128.159128 },
    { value: '성주', name: '성주', latitude: 35.919049, longitude: 128.282931 },
    { value: '안동', name: '안동', latitude: 36.568347, longitude: 128.729354 },
    { value: '영덕', name: '영덕', latitude: 36.415075, longitude: 129.365673 },
    { value: '영양', name: '영양', latitude: 36.666722, longitude: 129.112451 },
    { value: '영주', name: '영주', latitude: 36.805644, longitude: 128.624103 },
    { value: '영천', name: '영천', latitude: 35.973168, longitude: 128.938551 },
    { value: '예천', name: '예천', latitude: 36.657736, longitude: 128.452875 },
    { value: '울릉', name: '울릉', latitude: 37.484414, longitude: 130.905851 },
    { value: '울진', name: '울진', latitude: 36.993048, longitude: 129.400397 },
    { value: '의성', name: '의성', latitude: 36.352718, longitude: 128.697135 },
    { value: '청도', name: '청도', latitude: 35.647234, longitude: 128.733458 },
    { value: '청송', name: '청송', latitude: 36.43625, longitude: 129.057107 },
    { value: '칠곡', name: '칠곡', latitude: 35.995678, longitude: 128.401514 },
    { value: '포항', name: '포항', latitude: 36.019017, longitude: 129.343396 },
  ],
  경남: [
    { value: '거제', name: '거제', latitude: 34.880444, longitude: 128.621196 },
    { value: '거창', name: '거창', latitude: 35.686711, longitude: 127.909734 },
    { value: '고성', name: '고성', latitude: 34.973033, longitude: 128.322277 },
    { value: '김해', name: '김해', latitude: 35.228164, longitude: 128.889232 },
    { value: '남해', name: '남해', latitude: 34.837672, longitude: 127.892408 },
    { value: '밀양', name: '밀양', latitude: 35.50365, longitude: 128.746429 },
    { value: '사천', name: '사천', latitude: 35.003564, longitude: 128.063999 },
    { value: '산청', name: '산청', latitude: 35.415605, longitude: 127.873808 },
    { value: '양산', name: '양산', latitude: 35.334958, longitude: 129.037078 },
    { value: '의령', name: '의령', latitude: 35.321987, longitude: 128.261741 },
    { value: '진주', name: '진주', latitude: 35.179554, longitude: 128.107599 },
    { value: '창녕', name: '창녕', latitude: 35.544456, longitude: 128.492304 },
    { value: '창원', name: '창원', latitude: 35.227807, longitude: 128.681885 },
    { value: '통영', name: '통영', latitude: 34.854423, longitude: 128.433444 },
    { value: '하동', name: '하동', latitude: 35.06747, longitude: 127.751168 },
    { value: '함안', name: '함안', latitude: 35.272384, longitude: 128.40657 },
    { value: '함양', name: '함양', latitude: 35.520248, longitude: 127.725163 },
    { value: '합천', name: '합천', latitude: 35.566654, longitude: 128.165741 },
  ],
  제주: [
    { value: '서귀포', name: '서귀포', latitude: 33.254121, longitude: 126.560076 },
    { value: '제주', name: '제주', latitude: 33.499621, longitude: 126.531188 },
  ],
};
