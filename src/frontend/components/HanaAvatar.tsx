import React, { useId } from 'react';

interface HanaAvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const HanaAvatar: React.FC<HanaAvatarProps> = ({
  className = '',
  size = 'md',
  animated = false,
}) => {
  const uid = useId().replace(/:/g, '');

  const sizeMap = {
    sm: 'w-9 h-9',
    md: 'w-16 h-[76px]',
    lg: 'w-20 h-24',
  };

  const clipId = `clip0_${uid}`;
  const maskId = `mask0_${uid}`;
  const id = (name: string) => `${name}_${uid}`;

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center ${sizeMap[size]} ${className}`}
    >
      <svg
        viewBox="0 0 84 100"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full drop-shadow-sm ${
          animated
            ? 'animate-hana-float hover:scale-105 transition-transform duration-300'
            : ''
        }`}
      >
        <g clipPath={`url(#${clipId})`}>
          <path
            d="M28.6906 60.634C20.8393 57.9793 13.8735 53.9997 7.79329 48.6952C8.73565 49.3746 9.37629 50.3944 9.57932 51.5383C9.78235 52.6821 9.53179 53.8601 8.8808 54.8223C8.22981 55.7845 7.22959 56.4552 6.0923 56.6923C4.95501 56.9293 3.77011 56.714 2.78893 56.092C8.20745 62.3896 14.5115 67.3624 21.7011 71.0102C20.3251 70.0833 19.3737 68.6478 19.0561 67.0195C18.7385 65.3911 19.0808 63.7033 20.0077 62.3273C20.9346 60.9514 22.3701 59.9999 23.9984 59.6824C25.6268 59.3648 27.3146 59.7071 28.6906 60.634Z"
            fill={`url(#${id('paint0_linear')})`}
            strokeWidth="1.48909"
            strokeLinejoin="round"
            stroke="#2C3E45"
          />
          <path d="M9.28305 49.6877L4.27869 57.0844Z" fill="black" />
          <path
            d="M9.28305 49.6877L4.27869 57.0844"
            strokeWidth="0.893454"
            strokeLinecap="round"
            stroke="#B8CDD6"
          />
          <path
            d="M6.95822 46.6934C6.07188 46.0955 4.75686 46.4952 4.02105 47.5861C3.28524 48.677 3.40727 50.046 4.29362 50.6438C5.17996 51.2417 6.49498 50.842 7.23079 49.7511C7.9666 48.6602 7.84457 47.2912 6.95822 46.6934Z"
            fill={`url(#${id('paint1_radial')})`}
            strokeWidth="1.19127"
            stroke="#2C3E45"
          />
          <path
            d="M3.95121 55.1141C6.28406 54.6183 7.77323 52.3251 7.27737 49.9923C6.7815 47.6594 4.48838 46.1703 2.15553 46.6661C-0.177318 47.162 -1.66649 49.4551 -1.17063 51.788C-0.674766 54.1208 1.61836 55.61 3.95121 55.1141Z"
            fill={`url(#${id('paint2_radial')})`}
            strokeWidth="1.48909"
            stroke="#2C3E45"
          />
          <path
            opacity="0.55"
            d="M1.82622 50.8465C2.46976 50.7097 2.88057 50.0771 2.74378 49.4336C2.60699 48.79 1.9744 48.3792 1.33086 48.516C0.687315 48.6528 0.276509 49.2854 0.413298 49.9289C0.550088 50.5725 1.18267 50.9833 1.82622 50.8465Z"
            fill="white"
          />
          <path
            d="M38.5221 101.763C40.9878 101.849 43.089 98.9869 43.2153 95.3706C43.3416 91.7542 41.4451 88.7528 38.9794 88.6666C36.5137 88.5805 34.4125 91.4424 34.2862 95.0588C34.1599 98.6751 36.0564 101.677 38.5221 101.763Z"
            fill={`url(#${id('paint3_linear')})`}
            strokeWidth="1.48909"
            stroke="#2C3E45"
          />
          <path
            d="M60.4155 95.5112C62.4115 94.061 62.3054 90.5122 60.1784 87.5847C58.0515 84.6572 54.7092 83.4597 52.7132 84.9098C50.7171 86.36 50.8233 89.9088 52.9502 92.8363C55.0772 95.7638 58.4195 96.9614 60.4155 95.5112Z"
            fill={`url(#${id('paint4_linear')})`}
            strokeWidth="1.48909"
            stroke="#2C3E45"
          />
          <path
            d="M31.6386 18.7817C50.2824 14.8188 65.0674 29.9445 70.3559 51.9602C75.3968 72.8107 65.7624 87.6463 47.1186 91.6092C28.4747 95.5721 13.6391 85.9377 9.76345 64.8395C5.64015 42.5761 12.9947 22.7446 31.6386 18.7817Z"
            fill={`url(#${id('paint5_radial')})`}
          />
          <mask
            id={maskId}
            className="mask-luminance"
            maskUnits="userSpaceOnUse"
            x="8"
            y="18"
            width="64"
            height="75"
          >
            <path
              d="M31.6386 18.7817C50.2824 14.8188 65.0674 29.9445 70.3559 51.9602C75.3968 72.8107 65.7624 87.6463 47.1186 91.6092C28.4747 95.5721 13.6391 85.9377 9.76345 64.8395C5.64015 42.5761 12.9947 22.7446 31.6386 18.7817Z"
              fill="white"
            />
          </mask>
          <g mask={`url(#${maskId})`}>
            <path
              d="M3.42778 72.2756C17.3741 66.2665 25.9896 63.8262 31.357 63.2943C37.1691 70.5841 40.9491 74.0432 43.7749 75.8784C45.61 73.0525 47.6562 68.355 50.0008 59.3314C55.1206 57.6342 63.9837 56.3593 79.1684 56.1764L86.8465 92.2988L11.1058 108.398L3.42778 72.2756Z"
              fill={`url(#${id('paint6_linear')})`}
            />
            <path
              d="M78.5492 53.2634L2.80858 69.3625L11.4774 110.146L87.218 94.0468L78.5492 53.2634Z"
              fill={`url(#${id('paint7_linear')})`}
            />
            <path
              d="M31.357 63.2944C36.4626 70.1255 40.2426 73.5846 43.7749 75.8785C42.6279 77.6447 41.481 79.4108 40.8547 80.7618C36.2008 77.4884 30.8841 72.5291 27.3152 67.1983C28.6916 65.0789 29.9623 63.8953 31.357 63.2944Z"
              fill={`url(#${id('paint8_linear')})`}
              strokeWidth="0.893454"
              strokeLinejoin="round"
              stroke="#2C3E45"
            />
            <path
              d="M50.0008 59.3316C48.115 67.6487 46.0688 72.3462 43.7749 75.8785C45.541 77.0254 47.3072 78.1724 48.4288 79.1519C51.349 74.2686 54.1889 67.5755 55.281 61.2539C53.1616 59.8776 51.5193 59.3133 50.0008 59.3316Z"
              fill={`url(#${id('paint9_linear')})`}
              strokeWidth="0.893454"
              strokeLinejoin="round"
              stroke="#2C3E45"
            />
            <path
              d="M3.42778 72.2756C17.3741 66.2665 25.9896 63.8262 31.357 63.2943M50.0008 59.3314C55.1206 57.6342 63.9837 56.3593 79.1684 56.1764"
              strokeWidth="1.19127"
              stroke="#2C3E45"
            />
            <path
              d="M44.2702 78.209C45.6761 83.3906 46.7907 88.6342 47.7378 94.5224"
              strokeWidth="0.893454"
              stroke="#C3D5DC"
            />
            <path
              d="M47.8701 83.6854C48.5941 83.5315 49.0562 82.8199 48.9023 82.0959C48.7484 81.3719 48.0368 80.9098 47.3128 81.0636C46.5888 81.2175 46.1267 81.9292 46.2805 82.6532C46.4344 83.3772 47.1461 83.8393 47.8701 83.6854Z"
              fill="#0B5F73"
            />
            <path
              d="M49.1085 89.5116C49.8325 89.3577 50.2946 88.6461 50.1407 87.9221C49.9869 87.1981 49.2752 86.7359 48.5512 86.8898C47.8272 87.0437 47.3651 87.7554 47.519 88.4794C47.6728 89.2033 48.3845 89.6655 49.1085 89.5116Z"
              fill="#0B5F73"
            />
            <path
              d="M21.883 81.7496C21.6353 80.5843 22.0941 79.8779 23.2593 79.6302L32.5813 77.6488C33.7465 77.4011 34.453 77.8599 34.7006 79.0251L36.0629 85.4339C36.3931 86.9876 35.7814 87.9295 34.2278 88.2598L26.0711 89.9935C24.5174 90.3238 23.5755 89.712 23.2452 88.1584L21.883 81.7496Z"
              strokeWidth="0.893454"
              stroke="#B8CDD6"
            />
            <path
              d="M25.8136 75.8903C25.6939 75.3272 25.1404 74.9678 24.5773 75.0875C24.0142 75.2072 23.6547 75.7607 23.7744 76.3238L24.8271 81.2761C24.9468 81.8392 25.5003 82.1986 26.0634 82.0789C26.6265 81.9592 26.9859 81.4057 26.8662 80.8426L25.8136 75.8903Z"
              fill="#0B5F73"
            />
            <path
              d="M29.3276 76.6657C29.2079 76.1026 28.6544 75.7432 28.0913 75.8629C27.5282 75.9826 27.1687 76.5361 27.2884 77.0992L28.0315 80.5949C28.1512 81.158 28.7047 81.5175 29.2678 81.3978C29.8309 81.2781 30.1903 80.7246 30.0706 80.1615L29.3276 76.6657Z"
              fill="#F2A541"
            />
            <path
              opacity="0.7"
              d="M26.3396 39.219C31.3796 34.99 33.5797 29.3145 31.2537 26.5426C28.9277 23.7706 22.9565 24.9517 17.9165 29.1808C12.8765 33.4098 10.6764 39.0853 13.0024 41.8573C15.3283 44.6292 21.2996 43.4481 26.3396 39.219Z"
              fill={`url(#${id('paint10_radial')})`}
            />
            <path
              opacity="0.35"
              d="M11.6127 53.4854C9.13588 41.833 15.5222 28.9056 26.5554 23.5157"
              strokeWidth="1.48909"
              strokeLinecap="round"
              stroke="white"
            />
          </g>
          <path
            d="M32.0634 63.7533C30.338 75.69 41.0222 80.1174 51.5966 75.4339"
            strokeWidth="2.38255"
            strokeLinecap="round"
            stroke={`url(#${id('paint11_linear')})`}
          />
          <path
            d="M49.542 60.038C56.2717 65.9149 56.9275 71.865 52.2412 75.6013"
            strokeWidth="2.38255"
            strokeLinecap="round"
            stroke={`url(#${id('paint12_linear')})`}
          />
          <path
            d="M52.2412 75.6013C53.6954 76.7131 54.8376 77.7897 55.6679 78.8311"
            strokeWidth="2.38255"
            strokeLinecap="round"
            stroke={`url(#${id('paint13_linear')})`}
          />
          <path
            d="M32.404 65.3556C33.2889 65.1675 33.8537 64.2977 33.6656 63.4128C33.4776 62.5279 32.6077 61.9631 31.7229 62.1511C30.838 62.3392 30.2731 63.209 30.4612 64.0939C30.6493 64.9788 31.5191 65.5436 32.404 65.3556Z"
            fill="#C9D6DC"
            strokeWidth="0.744545"
            stroke="#2C3E45"
          />
          <path
            d="M49.8826 61.6402C50.7675 61.4521 51.3323 60.5823 51.1442 59.6975C50.9562 58.8126 50.0864 58.2477 49.2015 58.4358C48.3166 58.6239 47.7517 59.4937 47.9398 60.3786C48.1279 61.2634 48.9977 61.8283 49.8826 61.6402Z"
            fill="#C9D6DC"
            strokeWidth="0.744545"
            stroke="#2C3E45"
          />
          <path
            d="M58.1701 87.7378C61.2269 87.088 63.1782 84.0833 62.5285 81.0264C61.8787 77.9696 58.8739 76.0183 55.8171 76.668C52.7603 77.3178 50.8089 80.3225 51.4587 83.3794C52.1084 86.4362 55.1132 88.3875 58.1701 87.7378Z"
            fill="#DCE6EA"
            strokeWidth="1.04236"
            stroke="#2C3E45"
          />
          <path
            d="M57.7985 85.9901C52.1069 83.8507 52.3947 79.6183 56.7831 81.2126C60.1435 77.9712 62.128 81.7207 57.7985 85.9901Z"
            fill={`url(#${id('paint14_radial')})`}
            strokeWidth="1.04236"
            strokeLinejoin="round"
            stroke="#2C3E45"
          />
          <path
            d="M31.6386 18.7817C50.2824 14.8188 65.0674 29.9445 70.3559 51.9602C75.3968 72.8107 65.7624 87.6463 47.1186 91.6092C28.4747 95.5721 13.6391 85.9377 9.76345 64.8395C5.64015 42.5761 12.9947 22.7446 31.6386 18.7817Z"
            strokeWidth="1.78691"
            stroke="#2C3E45"
          />
          <path
            d="M31.7624 19.3643C29.8542 16.1163 30.524 13.5381 32.1917 11.3568"
            strokeWidth="1.48909"
            strokeLinecap="round"
            stroke="#2C3E45"
          />
          <path
            d="M33.9761 14.0224C28.7542 12.0876 29.0104 8.13596 33.0411 9.62363C36.1183 6.62512 37.9596 10.131 33.9761 14.0224Z"
            fill={`url(#${id('paint15_radial')})`}
            strokeWidth="1.19127"
            strokeLinejoin="round"
            stroke="#2C3E45"
            className={animated ? 'animate-hana-antenna' : undefined}
          />
          <path
            d="M14.8382 40.0121C22.0915 31.1631 45.3963 26.2095 55.6217 31.3434"
            strokeWidth="3.276"
            strokeLinecap="round"
            stroke="#2C3E45"
          />
          <path
            d="M14.8382 40.0121C22.0915 31.1631 45.3963 26.2095 55.6217 31.3434"
            strokeWidth="1.93582"
            strokeLinecap="round"
            stroke="#0B5F73"
          />
          <path
            d="M19.2008 43.3474C22.4186 42.6634 24.4726 39.5005 23.7886 36.2828C23.1047 33.065 19.9418 31.011 16.724 31.695C13.5063 32.3789 11.4523 35.5418 12.1362 38.7596C12.8202 41.9773 15.9831 44.0313 19.2008 43.3474Z"
            fill={`url(#${id('paint16_radial')})`}
            strokeWidth="1.48909"
            stroke="#2C3E45"
          />
          <path
            d="M18.4268 39.706C19.6335 39.4496 20.4037 38.2635 20.1473 37.0568C19.8908 35.8502 18.7047 35.0799 17.498 35.3364C16.2914 35.5929 15.5211 36.779 15.7776 37.9856C16.0341 39.1923 17.2202 39.9625 18.4268 39.706Z"
            fill="#F4FBFD"
            strokeWidth="0.893454"
            stroke="#0B5F73"
          />

          {/* Left Eye (blinks when animated) */}
          <g className={animated ? 'hana-eye' : undefined}>
            <path
              d="M29.1335 55.6986C31.3859 55.2198 32.7267 52.5493 32.1282 49.7338C31.5298 46.9183 29.2187 45.024 26.9663 45.5028C24.7139 45.9815 23.3731 48.652 23.9715 51.4676C24.57 54.2831 26.8811 56.1774 29.1335 55.6986Z"
              fill={`url(#${id('paint17_linear')})`}
            />
            <path
              d="M26.6771 50.5879C27.6424 50.3827 28.2309 49.3034 27.9915 48.1772C27.7521 47.051 26.7755 46.3044 25.8102 46.5096C24.8449 46.7148 24.2564 47.7941 24.4958 48.9203C24.7351 50.0465 25.7117 50.7931 26.6771 50.5879Z"
              fill="white"
            />
            <path
              opacity="0.9"
              d="M30.3208 53.4062C30.7713 53.3105 31.0589 52.8676 30.9631 52.4172C30.8674 51.9667 30.4246 51.6791 29.9741 51.7749C29.5236 51.8706 29.236 52.3134 29.3318 52.7639C29.4275 53.2144 29.8703 53.502 30.3208 53.4062Z"
              fill="white"
            />
          </g>

          {/* Right Eye (blinks when animated) */}
          <g className={animated ? 'hana-eye' : undefined}>
            <path
              d="M48.9426 51.4882C51.195 51.0094 52.5358 48.3389 51.9373 45.5234C51.3388 42.7078 49.0278 40.8135 46.7754 41.2923C44.523 41.7711 43.1822 44.4416 43.7806 47.2571C44.3791 50.0726 46.6902 51.9669 48.9426 51.4882Z"
              fill={`url(#${id('paint18_linear')})`}
            />
            <path
              d="M46.4862 46.3775C47.4515 46.1723 48.04 45.093 47.8006 43.9668C47.5612 42.8406 46.5846 42.094 45.6193 42.2991C44.654 42.5043 44.0655 43.5836 44.3049 44.7098C44.5442 45.836 45.5208 46.5827 46.4862 46.3775Z"
              fill="white"
            />
            <path
              opacity="0.9"
              d="M50.1299 49.1958C50.5804 49.1 50.868 48.6572 50.7722 48.2067C50.6764 47.7562 50.2336 47.4687 49.7832 47.5644C49.3327 47.6602 49.0451 48.103 49.1409 48.5535C49.2366 49.0039 49.6794 49.2915 50.1299 49.1958Z"
              fill="white"
            />
          </g>

          <path
            d="M23.994 63.0326C27.0508 62.3829 29.224 60.4215 28.8478 58.6517C28.4716 56.882 25.6886 55.9741 22.6318 56.6238C19.5749 57.2736 17.4018 59.235 17.778 61.0047C18.1542 62.7745 20.9372 63.6824 23.994 63.0326Z"
            fill={`url(#${id('paint19_radial')})`}
          />
          <path
            d="M56.6207 56.0976C59.6776 55.4478 61.8507 53.4864 61.4745 51.7167C61.0983 49.9469 58.3153 49.039 55.2585 49.6888C52.2017 50.3385 50.0286 52.2999 50.4047 54.0696C50.7809 55.8394 53.5639 56.7473 56.6207 56.0976Z"
            fill={`url(#${id('paint20_radial')})`}
          />
          <path
            d="M34.8851 55.5417C38.5412 58.4183 41.4543 57.7991 43.6244 53.6842"
            strokeWidth="1.48909"
            strokeLinecap="round"
            stroke="#2C3E45"
          />
          <path
            d="M20.7206 67.6867C15.2706 67.8302 10.1509 69.5274 5.3614 72.7782C6.5203 72.5319 7.72959 72.756 8.72325 73.4013C9.7169 74.0466 10.4135 75.0602 10.6598 76.2191C10.9062 77.378 10.682 78.5873 10.0368 79.5809C9.39148 80.5746 8.3779 81.2712 7.21899 81.5175C12.2562 79.4319 17.6236 78.9 23.3213 79.9217C21.6988 80.2666 20.0058 79.9528 18.6147 79.0494C17.2236 78.146 16.2483 76.727 15.9034 75.1045C15.5586 73.4821 15.8723 71.789 16.7757 70.3979C17.6791 69.0068 19.0982 68.0316 20.7206 67.6867Z"
            fill={`url(#${id('paint21_linear')})`}
            strokeWidth="1.48909"
            strokeLinejoin="round"
            stroke="#2C3E45"
          />
          <path d="M7.10925 72.4067L8.96685 81.146Z" fill="black" />
          <path
            d="M7.10925 72.4067L8.96685 81.146"
            strokeWidth="0.893454"
            strokeLinecap="round"
            stroke="#B8CDD6"
          />
          <path
            d="M3.36586 71.9844C2.3201 72.2067 1.69412 73.4303 1.9677 74.7174C2.24128 76.0045 3.31082 76.8677 4.35658 76.6454C5.40234 76.4231 6.02831 75.1995 5.75473 73.9124C5.48115 72.6253 4.41162 71.7622 3.36586 71.9844Z"
            fill={`url(#${id('paint22_radial')})`}
            strokeWidth="1.19127"
            stroke="#2C3E45"
          />
          <path
            d="M4.56624 81.9291C6.89909 81.4332 8.38826 79.1401 7.8924 76.8072C7.39654 74.4744 5.10342 72.9852 2.77057 73.4811C0.437718 73.9769 -1.05145 76.2701 -0.555592 78.6029C-0.0597295 80.9358 2.23339 82.4249 4.56624 81.9291Z"
            fill={`url(#${id('paint23_radial')})`}
            strokeWidth="1.48909"
            stroke="#2C3E45"
          />
          <path
            opacity="0.55"
            d="M2.44124 77.6614C3.08478 77.5246 3.49559 76.892 3.3588 76.2485C3.22201 75.605 2.58942 75.1941 1.94588 75.3309C1.30234 75.4677 0.89153 76.1003 1.02832 76.7439C1.16511 77.3874 1.79769 77.7982 2.44124 77.6614Z"
            fill="white"
          />
        </g>

        <defs>
          <linearGradient
            id={id('paint0_linear')}
            x1="1.50099"
            y1="50.0327"
            x2="30.7484"
            y2="68.75"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="#D5E3E9" />
          </linearGradient>
          <radialGradient
            id={id('paint1_radial')}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(5.73495 49.8917) rotate(-146) scale(2.71015 3.33556)"
          >
            <stop stopColor="#FFEBD0" />
            <stop offset="1" stopColor="#F2B47A" />
          </radialGradient>
          <radialGradient
            id={id('paint2_radial')}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(1.00463 49.5597) rotate(-12) scale(6.04571)"
          >
            <stop stopColor="#FFEBD0" />
            <stop offset="1" stopColor="#F2B47A" />
          </radialGradient>
          <linearGradient
            id={id('paint3_linear')}
            x1="34.5149"
            y1="88.5107"
            x2="34.0576"
            y2="101.607"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFD9A8" />
            <stop offset="1" stopColor="#E79E5F" />
          </linearGradient>
          <linearGradient
            id={id('paint4_linear')}
            x1="49.0991"
            y1="87.5356"
            x2="56.8014"
            y2="98.137"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFD9A8" />
            <stop offset="1" stopColor="#E79E5F" />
          </linearGradient>
          <radialGradient
            id={id('paint5_radial')}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(22.6081 35.9247) rotate(-12) scale(49.5896 59.5636)"
          >
            <stop stopColor="#FFF3E2" />
            <stop offset="0.4" stopColor="#FFD9A8" />
            <stop offset="1" stopColor="#F0AD72" />
          </radialGradient>
          <linearGradient
            id={id('paint6_linear')}
            x1="2.76543"
            y1="69.1594"
            x2="11.1058"
            y2="108.398"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="#DCE8EE" />
          </linearGradient>
          <linearGradient
            id={id('paint7_linear')}
            x1="2.80858"
            y1="69.3625"
            x2="78.5492"
            y2="53.2634"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9FB9C4" stopOpacity="0.35" />
            <stop offset="0.22" stopColor="#9FB9C4" stopOpacity="0" />
            <stop offset="0.78" stopColor="#9FB9C4" stopOpacity="0" />
            <stop offset="1" stopColor="#9FB9C4" stopOpacity="0.45" />
          </linearGradient>
          <linearGradient
            id={id('paint8_linear')}
            x1="26.696"
            y1="64.2852"
            x2="30.6589"
            y2="82.929"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E4F3F7" />
            <stop offset="1" stopColor="#BFDCE5" />
          </linearGradient>
          <linearGradient
            id={id('paint9_linear')}
            x1="40.6789"
            y1="61.313"
            x2="44.6418"
            y2="79.9568"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E4F3F7" />
            <stop offset="1" stopColor="#BFDCE5" />
          </linearGradient>
          <radialGradient
            id={id('paint10_radial')}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(22.128 34.1999) rotate(-40) scale(11.9127 6.552)"
          >
            <stop stopColor="white" stopOpacity="0.85" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id={id('paint11_linear')}
            x1="31.0867"
            y1="63.9609"
            x2="50.2876"
            y2="77.8586"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1A7C93" />
            <stop offset="1" stopColor="#0A4F60" />
          </linearGradient>
          <linearGradient
            id={id('paint12_linear')}
            x1="48.9594"
            y1="60.1619"
            x2="57.298"
            y2="60.6489"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1A7C93" />
            <stop offset="1" stopColor="#0A4F60" />
          </linearGradient>
          <linearGradient
            id={id('paint13_linear')}
            x1="52.2412"
            y1="75.6013"
            x2="56.3074"
            y2="77.3019"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1A7C93" />
            <stop offset="1" stopColor="#0A4F60" />
          </linearGradient>
          <radialGradient
            id={id('paint14_radial')}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(55.6391 82.4107) rotate(-12) scale(5.47217 4.51448)"
          >
            <stop stopColor="#FFD58A" />
            <stop offset="1" stopColor="#E58A22" />
          </radialGradient>
          <radialGradient
            id={id('paint15_radial')}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(31.991 10.7241) rotate(-12) scale(5.02385 4.1588)"
          >
            <stop stopColor="#FFD58A" />
            <stop offset="1" stopColor="#E58A22" />
          </radialGradient>
          <radialGradient
            id={id('paint16_radial')}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(15.1366 35.686) rotate(-12) scale(9.53018)"
          >
            <stop stopColor="white" />
            <stop offset="0.6" stopColor="#D6EBF1" />
            <stop offset="1" stopColor="#8FB7C4" />
          </radialGradient>
          <linearGradient
            id={id('paint17_linear')}
            x1="22.8879"
            y1="46.3696"
            x2="25.0551"
            y2="56.5655"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0F2733" />
            <stop offset="0.65" stopColor="#173F4D" />
            <stop offset="1" stopColor="#2B6B7E" />
          </linearGradient>
          <linearGradient
            id={id('paint18_linear')}
            x1="42.697"
            y1="42.1592"
            x2="44.8642"
            y2="52.355"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0F2733" />
            <stop offset="0.65" stopColor="#173F4D" />
            <stop offset="1" stopColor="#2B6B7E" />
          </linearGradient>
          <radialGradient
            id={id('paint19_radial')}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(23.3129 59.8282) rotate(-12) scale(5.65855 3.276)"
          >
            <stop stopColor="#F48A7A" stopOpacity="0.75" />
            <stop offset="1" stopColor="#F48A7A" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id={id('paint20_radial')}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(55.9396 52.8932) rotate(-12) scale(5.65855 3.276)"
          >
            <stop stopColor="#F48A7A" stopOpacity="0.75" />
            <stop offset="1" stopColor="#F48A7A" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id={id('paint21_linear')}
            x1="4.89313"
            y1="70.5752"
            x2="20.5641"
            y2="83.3136"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="#D5E3E9" />
          </linearGradient>
          <radialGradient
            id={id('paint22_radial')}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(4.81677 75.0861) rotate(168) scale(2.71015 3.33556)"
          >
            <stop stopColor="#FFEBD0" />
            <stop offset="1" stopColor="#F2B47A" />
          </radialGradient>
          <radialGradient
            id={id('paint23_radial')}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(1.61967 76.3746) rotate(-12) scale(6.04571)"
          >
            <stop stopColor="#FFEBD0" />
            <stop offset="1" stopColor="#F2B47A" />
          </radialGradient>
          <clipPath id={clipId}>
            <rect width="84" height="99.3462" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
