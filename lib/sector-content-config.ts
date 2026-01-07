export interface SectorAssetDefinition {
    key: string;
    label: string;
    defaultSrc: string;
    description?: string;
}

export const SECTOR_CONTENT_CONFIG: Record<string, SectorAssetDefinition[]> = {
    "engineering-construction": [
        {
            key: "SECTOR_CONSTRUCTION_FEATURE_1",
            label: "Key Expertise Areas Image",
            defaultSrc: "/images/eng-execute-site.png",
            description: "Displayed in the 'Key Expertise Areas' blue box."
        }
    ],
    "power-renewable-energy": [
        {
            key: "SECTOR_ENERGY_INTRO_IMAGE",
            label: "Intro Section Image",
            defaultSrc: "/images/eng-plan-meeting.png",
            description: "Image appearing in the split layout introduction."
        },
        {
            key: "SECTOR_ENERGY_BG_IMAGE",
            label: "Technologies Background Image",
            defaultSrc: "/images/sectors-hero-skyline.png",
            description: "Background for the technologies list section."
        }
    ],
    "fabrication-technical-services": [
        {
            key: "SECTOR_FABRICATION_FEATURE_1",
            label: "Welder Feature Image",
            defaultSrc: "/images/fabrication-welder-professional.png",
            description: "Main feature image in the introduction section."
        }
    ],
    "facilities-management": [
        {
            key: "SECTOR_FACILITIES_FEATURE_1",
            label: "Hard Services Image",
            defaultSrc: "/images/fm-hard-services-engineer.png",
            description: "Image for the Hard Services detail section."
        },
        {
            key: "SECTOR_FACILITIES_FEATURE_2",
            label: "Soft Services Image",
            defaultSrc: "/images/fm-soft-services-lobby.png",
            description: "Image for the Soft Services detail section."
        }
    ],
    "healthcare-pharmaceutical": [
        {
            key: "SECTOR_HEALTHCARE_COLLAGE_1",
            label: "Intro Collage Top (Team)",
            defaultSrc: "/images/healthcare-team-modern.png",
            description: "Top image in the intro section collage."
        },
        {
            key: "SECTOR_HEALTHCARE_COLLAGE_2",
            label: "Intro Collage Bottom (Consultation)",
            defaultSrc: "/images/healthcare-consultation.png",
            description: "Bottom image in the intro section collage."
        },
        {
            key: "SECTOR_HEALTHCARE_FEATURE_1",
            label: "Lab Facility Feature Image",
            defaultSrc: "/images/healthcare-lab-facility.png",
            description: "Image for the Evidence-Based Recruitment section."
        }
    ],
    "heavy-construction-equipment": [
        {
            key: "SECTOR_HEAVY_EQUIPMENT_INTRO_1",
            label: "Heavy Machinery Fleet Image",
            defaultSrc: "/images/heavy-equipment-fleet-modern.png",
            description: "Image showing the fleet in the intro section."
        },
        {
            key: "SECTOR_HEAVY_EQUIPMENT_FEATURE_1",
            label: "Safety Inspection Image",
            defaultSrc: "/images/heavy-equipment-safety-inspection.png",
            description: "Image for the Safety & Compliance section."
        }
    ],
    "hospitality-catering": [
        { key: "SECTOR_HOSPITALITY_CUISINE_ITALIAN", label: "Cuisine: Italian", defaultSrc: "/images/cuisine-italian-dish.png" },
        { key: "SECTOR_HOSPITALITY_CUISINE_ARABIC", label: "Cuisine: Arabic", defaultSrc: "/images/cuisine-arabic-dish.png" },
        { key: "SECTOR_HOSPITALITY_CUISINE_JAPANESE", label: "Cuisine: Japanese", defaultSrc: "/images/cuisine-japanese-dish.png" },
        { key: "SECTOR_HOSPITALITY_CUISINE_FRENCH", label: "Cuisine: French", defaultSrc: "/images/cuisine-french-dish.jpg" },
        { key: "SECTOR_HOSPITALITY_CUISINE_GREEK", label: "Cuisine: Greek", defaultSrc: "/images/cuisine-greek-dish.jpg" },
        { key: "SECTOR_HOSPITALITY_CUISINE_THAI", label: "Cuisine: Thai", defaultSrc: "/images/cuisine-thai-dish.jpg" },
        { key: "SECTOR_HOSPITALITY_CUISINE_SPANISH", label: "Cuisine: Spanish", defaultSrc: "/images/cuisine-spanish-dish.jpg" },
        { key: "SECTOR_HOSPITALITY_CUISINE_CHINESE", label: "Cuisine: Chinese", defaultSrc: "/images/cuisine-chinese-dish.jpg" },
        { key: "SECTOR_HOSPITALITY_CUISINE_INDIAN", label: "Cuisine: Indian", defaultSrc: "/images/cuisine-indian-dish.jpg" }
    ],
    "infrastructure-utilities": [
        {
            key: "SECTOR_INFRASTRUCTURE_FEATURE_1",
            label: "Bridges & Roads Image",
            defaultSrc: "/images/sector-feature-construction.png",
            description: "Image for the Bridges & Roads card."
        },
        {
            key: "SECTOR_INFRASTRUCTURE_FEATURE_2",
            label: "Utilities Image",
            defaultSrc: "/images/water-pipe-site.png",
            description: "Image for the Utilities card."
        }
    ],
    "oil-gas-petrochemical": [
        {
            key: "SECTOR_OIL_GAS_INTRO_1",
            label: "Unified Operations Image",
            defaultSrc: "/images/oil-gas-operations-unified.png",
            description: "Image for the Unified Operations split section."
        }
    ],
    "operation-maintenance": [
        {
            key: "SECTOR_OM_INTRO_1",
            label: "Industrial Maintenance Image",
            defaultSrc: "/images/om-industrial-maintenance.png",
            description: "Image for the Industrial Maintenance Scope section."
        }
    ],
    "water-wastewater": [
        {
            key: "SECTOR_WATER_FEATURE_1",
            label: "Desalination Plant Image",
            defaultSrc: "/images/water-desalination-plant.png",
            description: "Image for the Desalination Plant section."
        },
        {
            key: "SECTOR_WATER_FEATURE_2",
            label: "Wastewater Treatment Image",
            defaultSrc: "/images/water-wastewater-treatment.png",
            description: "Image for the Wastewater Treatment section."
        },
        {
            key: "SECTOR_WATER_FEATURE_3",
            label: "Waste to Resource Image",
            defaultSrc: "/images/water-waste-to-resource.png",
            description: "Image for the Waste to Resource section."
        }
    ]
};
