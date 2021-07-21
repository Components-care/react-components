var AuthMode;
(function (AuthMode) {
    /**
     * Enable Authentication
     */
    AuthMode[AuthMode["On"] = 0] = "On";
    /**
     * Disable Authentication
     */
    AuthMode[AuthMode["Off"] = 1] = "Off";
})(AuthMode || (AuthMode = {}));
export default AuthMode;
