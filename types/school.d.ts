type EnglishPlayNames = "Cass" | "Taylor" | "Sterling" | "none";

declare module "twine-sugarcube" {
	export interface SugarCubeStoryVariables {
		schoolstate:
			| "lunch"
			| "afternoon"
			| "early"
			| "morning"
			| "first"
			| "second"
			| "third"
			| "fourth"
			| "fifth"
			| "late"
			| "earlynoschool"
			| "daynoschool"
			| "latenoschool";

		science_exam: number;
		science_up_message: 0 | 1;
		science_down_message: 0 | 1;

		maths_exam: number;
		maths_up_message: 0 | 1;
		maths_down_message: 0 | 1;

		english_exam: number;
		english_up_message: 0 | 1;
		english_down_message: 0 | 1;

		history_exam: number;
		history_up_message: 0 | 1;
		history_down_message: 0 | 1;

		scienceproject: "none";
		mathsproject: "none";
		englishPlay: "ongoing" | "none" | "missed" | "done";

		englishPlayReadiness: number;
		englishPlayDoubleRehearsal: boolean;

		englishPlayRoles: {
			Player: EnglishPlayNames;
			Kylar: EnglishPlayNames;
			Sydney: EnglishPlayNames;
			KylarKnown: boolean;
			KylarCount: number;
			SydneyKnown: boolean;
			SydneyCount: number;
		};
	}
}

export {};
