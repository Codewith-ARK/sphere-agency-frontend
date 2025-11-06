import React, { createContext, useContext, useState } from "react";

const CampaignContext = createContext({
    campaign: null,
    setCampaign: () => { },
    clearCampaign: () => { },
});

function CampaignProvider({ children }) {
    const [campaign, setCampaign] = useState(null);

    const clearCampaign = () => setCampaign(null);

    return (
        <CampaignContext.Provider value={{ campaign, setCampaign, clearCampaign }}>
            {children}
        </CampaignContext.Provider>
    );
}

function useCampaign() {
    const ctx = useContext(CampaignContext);
    if (!ctx) {
        throw new Error("useCampaign must be used within a CampaignProvider");
    }
    return ctx;
}

export { CampaignProvider, CampaignContext, useCampaign };