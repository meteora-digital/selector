function objectAssign(defaultSettings, userSettings) {
    for (key in defaultSettings) {
    	if (userSettings[key]) {
    		defaultSettings[key] = userSettings[key];
    	}
    }

    return defaultSettings;
}

module.exports = objectAssign;