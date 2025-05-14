module.exports = {
  expo: {
    name: "Mobile-PI3",
    slug: "mobile-pi3",
    scheme: "mobile-pi3",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/favicon.png",
      bundler: "metro"
    },
    plugins: [
      [
        "expo-font",
        {
          fonts: [
            "./assets/fonts/GildaDisplay-Regular.ttf"
          ]
        }
      ],
      "expo-router"
    ]
  }
}
