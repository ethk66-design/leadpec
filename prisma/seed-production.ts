import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SERVICES = [
    {
        title: "Permanent Recruitment",
        slug: "permanent-recruitment",
        description: "Long-term talent solutions aligned with your organizational culture and goals.",
        content: "Our Permanent Recruitment service is designed to identify and secure talent that not only fits the job description but also aligns with your company's long-term vision. We utilize a deep-dive approach, assessing technical skills, behavioral traits, and cultural fit to ensure high retention and performance.",
        features: JSON.stringify(["Culture Fit Assessment", "Long-term Retention Strategy", "Global Talent Pools", "Detailed Candidate Profiling"]),
        iconName: "Users",
        // Images are handled via SiteAsset in a separate logic or simple strings here?
        // Current Service Model has features, chaining, process as JSON strings.
        branding: JSON.stringify({
            heroTitle: "Identifying Leadership.",
            heroSubtitle: "Defining The Future.",
            quote: "True recruitment isn't about filling a vacancy. It's about finding the missing piece of your strategic puzzle.",
            conceptTitle: "Our Concept",
            processTitle: "The Recruitment Lifecycle"
        }),
        process: JSON.stringify([
            { title: "Discovery & DNA", description: "We immerse ourselves in your culture to define the exact avatar of your ideal candidate." },
            { title: "Global Sourcing", description: "Leveraging our 50+ country network to map talent that isn't on the open market." },
            { title: "Rigorous Assessment", description: "Multi-stage behavioral and technical interviews to validate competency and fit." },
            { title: "Onboarding Success", description: "Structured transition support to ensure immediate impact and long-term retention." }
        ])
    },
    {
        title: "Executive Search",
        slug: "executive-search",
        description: "Specialized headhunting for C-suite and senior leadership roles.",
        content: "Leadership defines an organization. Our Executive Search practice is a discreet, rigorous process dedicated to finding C-suite executives and Senior leaders who can drive transformation. We leverage exclusive networks and market intelligence to access the top 1% of industry talent.",
        features: JSON.stringify(["Confidential Search", "Leadership Competency Framework", "C-Level Network Access", "Strategic Succession Planning"]),
        iconName: "Search",
        branding: JSON.stringify({
            heroTitle: "Leadership That Defines The Future.",
            heroSubtitle: "Vision. Strategy. Impact.",
            quote: "Great leadership is the difference between a company that survives and one that thrives.",
            conceptTitle: "The Executive Ecosystem",
            processTitle: "Executive Search Architecture"
        }),
        process: JSON.stringify([
            { title: "Market Mapping", description: "In-depth analysis of the competitive landscape to identify potential leaders." },
            { title: "Discreet Outreach", description: "Confidential engagement with passive candidates who are not actively looking." },
            { title: "Competency Verification", description: "Rigorous vetting of track record, leadership style, and cultural alignment." },
            { title: "Strategic Appointment", description: "Facilitating the negotiation and onboarding of high-impact leadership." }
        ])
    },
    {
        title: "Temporary & Contract Staffing",
        slug: "temporary-contract-staffing",
        description: "Flexible workforce solutions for projects and seasonal peaks.",
        content: "Agility is the new currency. Our Contract Staffing solutions allow you to scale your workforce up or down based on project demands without the long-term overhead. We provide deployment-ready professionals for short-term projects, seasonal peaks, and specialized technical roles.",
        features: JSON.stringify(["Rapid Deployment", "Project-Based Hiring", "Payroll & Compliance Management", "Skill-Specific Short-Term Talent"]),
        iconName: "Clock",
        branding: JSON.stringify({
            heroTitle: "Agility Meets Scale.",
            heroSubtitle: "Deploy. Execute. Succeed.",
            quote: "In a fast-paced world, the ability to scale your workforce on demand is your competitive advantage.",
            conceptTitle: "Workforce Mobility",
            processTitle: "Rapid Deployment System"
        }),
        process: JSON.stringify([
            { title: "Scope & Mobilize", description: "Immediate analysis of project timeline and manpower requirements." },
            { title: "Rapid Sourcing", description: "Tapping into our pre-vetted database of contract-ready professionals." },
            { title: "Compliance & Logistics", description: "Handling visas, payroll, and travel for seamless deployment." },
            { title: "On-Site Management", description: "Ongoing support to ensure contractor performance and satisfaction." }
        ])
    }
];

// Simplified SECTORS from constants.ts (since they didn't have branding yet)
const SECTORS = [
    {
        title: "Engineering & Construction",
        slug: "engineering-construction",
        description: "Building the foundations of tomorrow.",
        content: "Engineering the Future of Infrastructure. From conceptual design to final completion, LEADPEC connects experts to build roads, bridges, highways, dams, and tunnels. We pair talent with main contractors and design houses for monumental projects worldwide.\n\nOur capabilities match the industry's advanced technologies:\n• Bridges & Roads: Precast, Segmental, Post Tensioning, Cable Stayed, and Suspension systems.\n• Utilities: Water & Sewer Network Installation, Electrical & Telecom Infrastructure, District Cooling.\n\nWe address the global demand for skilled talent in rapid urbanization, ensuring projects are delivered on time and to the highest safety standards.",
        iconName: "HardHat"
    },
    {
        title: "Healthcare & Pharmaceutical",
        slug: "healthcare-pharmaceutical",
        description: "Deliver excellence in care",
        content: "Talent That Heals. Teams That Deliver. We are a specialist partner for building high-performing clinical, scientific, and operational teams.\n\nWe recruit across:\n• Medicine, Nursing, Clinical Research\n• Regulatory Affairs, Quality Assurance (QA/QC)\n• Pharmacovigilance, Manufacturing, Market Access\n\nEvery search follows a structured, evidence-based process with rigorous credential verification, ensuring candidates meet the technical and compliance standards of hospitals, research institutions, and pharmaceutical operations.",
        iconName: "HeartPulse"
    },
    {
        title: "Infrastructure & Utilities",
        slug: "infrastructure-utilities",
        description: "Strengthen essential services",
        content: "Engineering the Future of Infrastructure. From conceptual design to final completion, LEADPEC connects experts to build roads, bridges, highways, dams, and tunnels. We pair talent with main contractors and design houses for monumental projects worldwide.\n\nOur capabilities match the industry's advanced technologies:\n• Bridges & Roads: Precast, Segmental, Post Tensioning, Cable Stayed, and Suspension systems.\n• Utilities: Water & Sewer Network Installation, Electrical & Telecom Infrastructure, District Cooling.\n\nWe address the global demand for skilled talent in rapid urbanization, ensuring projects are delivered on time and to the highest safety standards.",
        iconName: "Building2"
    },
    {
        title: "Power & Renewable Energy",
        slug: "power-renewable-energy",
        description: "Energize the world naturally",
        content: "Powering the Future. The energy landscape is shifting, and we are at the forefront of this transition. We support major EPCC and O&M contractors in both conventional power and the rapidly growing renewable sector.\n\nWe specialize in:\n• Renewable Energy: Solar (CSP & PV), Wind (Onshore & Offshore), Hydro-electric, Biomass, Geothermal.\n• Conventional Power: Coal-Fired, Combined Cycle Gas Turbine (CCGT), Oil-Fired.\n• Grid Infrastructure: Transmission & Distribution, Substation automation, Smart Grids.\n\nOur network includes engineers and project managers who are driving the global shift toward sustainable energy.",
        iconName: "Zap"
    },
    {
        title: "Fabrication & Technical Services",
        slug: "fabrication-technical-services",
        description: "Precision in every detail",
        content: "Precision Engineering. Global Standards. We provide specialized technical manpower for large-scale fabrication and technical service projects, ensuring quality and compliance at every stage.\n\nOur expertise covers:\n• Fabrication Yards: Modular construction, pipe racks, pressure vessels, and offshore structures.\n• Technical Services: NDT testing, welding inspection (CSWIP/AWS), coating inspection (NACE/BGAS), and QA/QC.\n\nWe supply the skilled craftsmen and certified inspectors needed to maintain the integrity of complex industrial assets.",
        iconName: "Cog"
    },
    {
        title: "Heavy Construction Equipment",
        slug: "heavy-construction-equipment",
        description: "Mobilize powerful machinery",
        content: "Maximum Uptime. Peak Performance. The construction and mining industries rely on heavy machinery. We connect you with the experts who keep these machines running.\n\nWe recruit:\n• Maintenance: Heavy Equipment Mechanics, Hydraulic Specialists, Auto-Electricians.\n• Operations: Certified Operators for cranes, excavators, bulldozers, and specialized yellow iron.\n• Management: Fleet Managers, Workshop Supervisors, Parts Coordinators.\n\nFrom remote mining sites to urban construction megaprojects, we ensure your fleet is manned by qualified, safety-conscious professionals.",
        iconName: "Truck"
    },
    {
        title: "Oil, Gas & Petrochemical",
        slug: "oil-gas-petrochemical",
        description: "Fuel global progress",
        content: "Fueling the World. We have established deep roots in the Oil & Gas sector, supporting the entire value chain from upstream exploration to downstream refining.\n\nOur recruitment expertise includes:\n• Upstream: Exploration & Production, Drilling Operations, Subsea Engineering, Geosciences.\n• Midstream: Pipelines, Storage, LNG Liquefaction & Regasification.\n• Downstream: Refineries, Petrochemical Plants, Polymer Production, Fertilizer Complexes.\n\nWe understand the strict safety cultures (HSE) and technical competencies required to operate in this high-stakes industry.",
        iconName: "Droplet"
    },
    {
        title: "Water & Wastewater",
        slug: "water-wastewater",
        description: "Sustaining Life",
        content: "Pure Water. Sustainable Solutions. As water scarcity becomes a global challenge, the demand for water infrastructure expertise grows. We partner with experts in the water cycle.\n\nWe recruit for:\n• Desalination Plants: RO (Reverse Osmosis), MSF (Multi-Stage Flash), MED.\n• Wastewater Treatment: Industrial Effluent Treatment, Sewage Treatment Plants (STP).\n• Distribution: Pumping Stations, Pipeline Networks, Leak Detection.\n\nOur candidates are engineers and technicians dedicated to ensuring access to clean water and environmentally responsible waste management.",
        iconName: "Waves"
    },
    {
        title: "Facilities Management",
        slug: "facilities-management",
        description: "Optimize operations",
        content: "Optimizing Spaces. Empowering People. Elevating Performance. Facilities Management is the backbone of any thriving organization. We meticulously identify candidates for:\n\n• Hard FM Services: Civil & Building, MEP Services, Fire & Security Systems, Building Automation (BMS).\n• Soft FM Services: Cleaning, Ground Maintenance, Security, Front of House, Pest Control, Waste Management.\n\nOur talent optimizes energy usage, enhances safety, and streamlines processes, transforming facilities into intelligent, responsive ecosystems.",
        iconName: "Settings"
    },
    {
        title: "Hospitality & Catering",
        slug: "hospitality-catering",
        description: "Enhance service standards",
        content: "Talent That Serves Excellence. We connect world-class professionals with hotels, resorts, cruise liners, and event operators globally.\n\nWe recruit for:\n• Executive Leadership: General Managers, Hotel Managers, F&B Directors.\n• Culinary: Executive Chefs, Sous Chefs, Pastry Chefs.\n• Operations: Front Office, Housekeeping, Guest Relations, Event Management.\n\nUnderstanding that hospitality is about the guest experience, we look for candidates with the right personality, language skills, and service mindset to elevate your brand.",
        iconName: "Coffee"
    },
    {
        title: "Operation & Maintenance",
        slug: "operation-maintenance",
        description: "Keep systems running",
        content: "Maintenance That Powers Success. Industrial operations demand precision. We deliver certified, job-ready specialists across oil & gas, power generation, manufacturing, and heavy industries.\n\nWe recruit for:\n• Refineries & Petrochemical Plants\n• Power Plants & Industrial Plants\n• Road & Utilities, Waste Water Treatment\n• Substation & Transmission\n\nOur technical experts understand complex assets and high-risk environments, ensuring zero-fault execution and operational continuity.",
        iconName: "Wrench"
    }
];

async function main() {
    console.log("Starting production seed...");

    // Seed Services
    for (const service of SERVICES) {
        await prisma.service.upsert({
            where: { slug: service.slug },
            update: {
                title: service.title,
                description: service.description,
                content: service.content,
                features: service.features,
                iconName: service.iconName,
                branding: service.branding,
                process: service.process
            },
            create: {
                title: service.title,
                slug: service.slug,
                description: service.description,
                content: service.content,
                features: service.features,
                iconName: service.iconName,
                branding: service.branding,
                process: service.process
            }
        });
        console.log(`Upserted Service: ${service.title}`);
    }

    // Seed Sectors
    for (const sector of SECTORS) {
        await prisma.sector.upsert({
            where: { slug: sector.slug },
            update: {
                title: sector.title,
                description: sector.description,
                content: sector.content,
                iconName: sector.iconName
            },
            create: {
                title: sector.title,
                slug: sector.slug,
                description: sector.description,
                content: sector.content,
                iconName: sector.iconName
            }
        });
        console.log(`Upserted Sector: ${sector.title}`);
    }

    console.log("Seeding completed.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
