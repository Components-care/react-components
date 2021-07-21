import { useTranslation } from "react-i18next";
import ccI18n from "../i18n";
/**
 * Internal helper for useTranslation hook
 */
var useCCTranslations = function () {
    return useTranslation(undefined, {
        i18n: ccI18n,
    });
};
export default useCCTranslations;
