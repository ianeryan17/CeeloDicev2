import * as Font from "expo-font";

export const useFont = async () =>
        await Font.loadAsync({
          'LeagueSpartan': require('./android/app/src/main/assets/fonts/aAnotherTag.ttf'),
        });