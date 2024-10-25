import { Alert, Image, Linking, Text, View } from "react-native";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { googleOAuth } from "@/lib/auth";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleOAuth(startOAuthFlow);
      console.log(result);

      if (result.code === "session_exists" || result.code === "success") {
        router.replace("/(root)/(tabs)/home");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>
      <CustomButton
        title="Log In with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      ></CustomButton>
    </View>
  );
};

export default OAuth;
