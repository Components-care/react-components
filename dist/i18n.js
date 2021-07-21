import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
var loadLang = function (lang) {
    return ({
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        translation: require("./assets/i18n/" + lang + "/translation.json"),
    });
};
// edit this when adding new languages
export var langs = ["de", "en", "fr", "ru", "uz"];
var langVals = {};
for (var _i = 0, langs_1 = langs; _i < langs_1.length; _i++) {
    var lang = langs_1[_i];
    langVals[lang] = loadLang(lang);
}
var ccI18n = i18n.createInstance();
void ccI18n
    // detect user language
    // see: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
    ns: ["translation"],
    defaultNS: "translation",
    supportedLngs: langs,
    nonExplicitSupportedLngs: true,
    fallbackLng: "en",
    debug: process.env.NODE_ENV !== "production",
    resources: langVals,
    initImmediate: false,
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
});
export default ccI18n;
