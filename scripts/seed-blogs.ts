import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding blog posts...");

    const posts = [
        {
            title: "The Future of Workforce Planning in Oil & Gas",
            slug: "future-workforce-in-oil-and-gas",
            content: `
        <p>The energy sector is undergoing a massive transformation. As traditional extraction methods evolve alongside renewable integration, the demand for a versatile, highly skilled workforce has never been critical.</p>
        <h3>Adapting to Digital Operations</h3>
        <p>Modern refineries are no longer just about pipes and valves; they are data-driven ecosystems. We are seeing a 40% rise in demand for control room operators who handle complex analytics alongside mechanical systems.</p>
        <p>At LEADPEC, we specialize in sourcing teams that bridge this gap—professionals who respect the rig's physical demands while navigating its digital future.</p>
        <h3>Safety First, Always</h3>
        <p>Regardless of technology, safety remains paramount. Our candidates undergo rigorous vetting not just for technical skills, but for safety culture adherence.</p>
      `,
            image: "/images/blog/blog-oil-gas.png",
            published: true,
            author: "Senior Recruiter, Energy Division",
        },
        {
            title: "Precision in Fabrication: Why Skill Gap Matters",
            slug: "precision-fabrication-skill-gap",
            content: `
        <p>In the world of heavy industrial fabrication, "good enough" is a point of failure. The tolerance levels for modern infrastructure projects have tightened, and so must the skills of the welders and fabricators.</p>
        <h3>The Certified Welder Shortage</h3>
        <p>Global infrastructure projects are booming, but the supply of certified high-pressure welders hasn't kept pace. This skill gap threatens project timelines.</p>
        <p>We solve this by maintaining a strategic reserve of pre-vetted talent, ready to mobilize. Our fabrication specialists aren't just workers; they are craftsmen who understand the metallurgy behind the arc.</p>
      `,
            image: "/images/blog/blog-fabrication.png",
            published: true,
            author: "Operations Director",
        },
        {
            title: "Smart Facility Management for Corporate Towers",
            slug: "smart-facility-management",
            content: `
        <p>Facility management has moved from the basement to the boardroom. In today's premium corporate real estate, the FM team is the guardian of both asset value and tenant experience.</p>
        <h3>Predictive Maintenance</h3>
        <p>Gone are the days of fixing things when they break. Our deployed FM teams use IoT sensors to predict HVAC failures before a tenant ever feels a temperature shift.</p>
        <p>This proactive approach reduces long-term operational costs by up to 20%, proving that high-quality maintenance pays for itself.</p>
      `,
            image: "/images/blog/blog-facility.png",
            published: true,
            author: "Head of Facilities",
        },
    ];

    for (const post of posts) {
        const existing = await prisma.post.findUnique({
            where: { slug: post.slug },
        });

        if (!existing) {
            await prisma.post.create({
                data: post,
            });
            console.log(`Created post: ${post.title}`);
        } else {
            console.log(`Skipping existing post: ${post.title}`);
        }
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
