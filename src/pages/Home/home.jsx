import { useDispatch } from 'react-redux';
import { setloader, header } from '../../store/login';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useInView, useSpring, useTransform, animate } from 'framer-motion';
import { ReactTyped } from "react-typed";
import tick from '../../assets/home/tick.webp'
import tick2 from '../../assets/home/tick2.webp'
import heroImage from '../../assets/home/hero_character.png'

const StatItem = ({ targetValue, label, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            const controls = animate(0, targetValue, {
                duration: 2,
                onUpdate: (value) => setCount(Math.floor(value)),
            });
            return () => controls.stop();
        }
    }, [isInView, targetValue]);

    return (
        <div ref={ref} className="flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl">
            <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {count}{suffix}
            </span>
            <span className="text-gray-400 mt-2 font-medium uppercase tracking-wider text-sm">
                {label}
            </span>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -10, transition: { duration: 0.2 } }}
        className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:border-indigo-100 group"
    >
        <div className="w-16 h-16 mb-6 rounded-2xl bg-indigo-50 flex items-center justify-center p-3 group-hover:bg-indigo-600 transition-colors duration-300">
            <img src={icon} alt={title} className="w-full h-full object-contain group-hover:invert transition-all duration-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed text-sm">{desc}</p>
    </motion.div>
);

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(header("Home"))
        dispatch(setloader(false))
    }, [dispatch]);

    return (
        <div className="w-full min-h-screen bg-slate-50 font-sans overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[calc(100vh-70px)] flex flex-col items-center justify-center overflow-hidden bg-slate-900 border-b border-indigo-500/20">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full" />
                    <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full" />
                </div>

                <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12 z-10 py-12 lg:py-0">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 text-center lg:text-left"
                    >
                        <h2 className="text-indigo-400 font-bold tracking-widest uppercase mb-4 text-sm md:text-base">
                            Welcome to <span className="text-white italic font-['Permanent_Marker'] lowercase tracking-normal text-2xl ml-2">BattleFiesta!</span>
                        </h2>
                        
                        <div className="mb-6">
                            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                                All-In-One platform for <br />
                                <span className="text-yellow-400 inline-block mt-2 min-h-[80px]">
                                    <ReactTyped
                                        strings={["Create", "Host", "Manage"]}
                                        typeSpeed={100}
                                        backSpeed={50}
                                        loop
                                    />
                                </span> <br />
                                <span className="text-white">Esport Tournaments</span>
                            </h1>
                        </div>

                        <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Battlefiesta, your ultimate destination for creating, hosting and managing 
                            PUBG, BGMI, and FREEFIRE tournaments. Elevate your gaming experience with 
                            professional setups and an active community.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <NavLink to='/dashboard' className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full transition-all hover:bg-slate-100 hover:scale-105 shadow-xl shadow-white/10 active:scale-95 text-center">
                                Open Dashboard
                            </NavLink>
                            <NavLink to='/tournaments' className="px-8 py-4 bg-transparent border-2 border-indigo-500 text-white font-bold rounded-full transition-all hover:bg-indigo-500/10 hover:border-indigo-400 hover:scale-105 active:scale-95 text-center">
                                Find Tournament
                            </NavLink>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="flex-1 relative"
                    >
                        <div className="relative z-10 w-full max-w-[500px] mx-auto filter drop-shadow-[0_20px_50px_rgba(79,70,229,0.3)]">
                            <img
                                src={heroImage}
                                alt="battlefiesta hero"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        {/* Decorative background element for image */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/20 rounded-full blur-[80px] -z-1" />
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-slate-900 py-20 px-6 relative">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
                        <StatItem targetValue={5000} label="Registered Users" suffix="+" />
                        <StatItem targetValue={120} label="Tournaments" suffix="+" />
                        <StatItem targetValue={1500} label="Matches Managed" suffix="+" />
                        <StatItem targetValue={250} label="Organizers" suffix="+" />
                    </div>
                </div>
            </section>

            {/* Offers Section */}
            <section className="py-24 px-6 bg-white">
                <div className="container mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4"
                    >
                        What we <span className="text-indigo-600">Offer?</span>
                    </motion.h2>
                    <p className="text-gray-500 text-lg mb-16 max-w-2xl mx-auto italic font-['Permanent_Marker'] opacity-70">
                        Everything you need to run professional eSports events.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard 
                            icon="https://res.cloudinary.com/dusxlxlvm/image/upload/v1717659946/battlefiesta/assets/icon/smile_zlwkc6.webp"
                            title="Easy Management"
                            desc="Effortlessly oversee all aspects of your eSports tournaments through a unified platform."
                            index={0}
                        />
                        <FeatureCard 
                            icon="https://res.cloudinary.com/dusxlxlvm/image/upload/v1717659947/battlefiesta/assets/icon/pie_rqnlut.webp"
                            title="Points Table"
                            desc="Real-time updates as match results are entered. No more manual spreadsheets."
                            index={1}
                        />
                        <FeatureCard 
                            icon="https://res.cloudinary.com/dusxlxlvm/image/upload/v1717659946/battlefiesta/assets/icon/graph_bs27xu.webp"
                            title="Detailed Stats"
                            desc="Showcase top performers, killboard leaders, and crucial match metrics."
                            index={2}
                        />
                        <FeatureCard 
                            icon="https://res.cloudinary.com/dusxlxlvm/image/upload/v1717659946/battlefiesta/assets/icon/trophy_l6yfkd.webp"
                            title="Leaderboards"
                            desc="Discover elite players leading the fray with prominently featured top fraggers lists."
                            index={3}
                        />
                        <FeatureCard 
                            icon="https://res.cloudinary.com/dusxlxlvm/image/upload/v1717659946/battlefiesta/assets/icon/gal_zfhodc.webp"
                            title="Support Logos"
                            desc="Customization for players and teams during registration with logo uploads."
                            index={4}
                        />
                        <FeatureCard 
                            icon="https://res.cloudinary.com/dusxlxlvm/image/upload/v1717659946/battlefiesta/assets/icon/form_ogkmwe.webp"
                            title="Registration"
                            desc="High-conversion registration forms to gather entries for your tournament."
                            index={5}
                        />
                        <FeatureCard 
                            icon="https://res.cloudinary.com/dusxlxlvm/image/upload/v1717659946/battlefiesta/assets/icon/cal_ralxad.webp"
                            title="Point System"
                            desc="Flexible point systems. Set your own rules or use professional defaults."
                            index={6}
                        />
                        <FeatureCard 
                            icon="https://res.cloudinary.com/dusxlxlvm/image/upload/v1717659946/battlefiesta/assets/icon/joy_acqkzw.webp"
                            title="All Games"
                            desc="Support for widespread Battle Royale and Multiplayer TDM games."
                            index={7}
                        />
                    </div>
                </div>
            </section>

            {/* Alternating Detail Sections */}
            <div className="bg-slate-50">
                {/* Section 1: Management */}
                <section className="py-20 flex flex-col items-center">
                    <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1 order-2 lg:order-1"
                        >
                            <h3 className="text-3xl md:text-5xl font-bold text-slate-800 mb-8 leading-tight">
                                Create and manage tournaments <span className="text-indigo-600">on the go.</span>
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "Create effortlessly with a single form.",
                                    "Effortlessly Manage numerous matches and teams.",
                                    "Customize your point system to suit your needs.",
                                    "Easily add or disqualify teams with one click.",
                                    "Seamlessly manage reports for each match."
                                ].map((text, i) => (
                                    <li key={i} className="flex items-start gap-4 text-slate-600 font-medium">
                                        <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center border border-green-400">
                                            <img src={tick2} alt="✓" className="w-3 h-3 invert" />
                                        </div>
                                        <span>{text}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="flex-1 order-1 lg:order-2"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                <img src={'https://res.cloudinary.com/dusxlxlvm/image/upload/v1717660387/battlefiesta/assets/icon/createform_txo62o.webp'} alt="Manage" className="relative rounded-2xl w-full shadow-2xl" />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Section 2: Results */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="flex-1"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                <img src={'https://res.cloudinary.com/dusxlxlvm/image/upload/v1717660387/battlefiesta/assets/icon/enterresult_hxnpjl.webp'} alt="Results" className="relative rounded-2xl w-full shadow-2xl" />
                            </div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1"
                        >
                            <h3 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
                                Adding results <br /><span className="text-orange-500 underline decoration-indigo-200 decoration-8 underline-offset-4">made easy.</span>
                            </h3>
                            <p className="text-slate-500 mb-8 italic">User experience is our top priority. The entry process is designed for speed.</p>
                            <ul className="space-y-4">
                                {[
                                    "Add participating teams once.",
                                    "Select team and kills; we handle calculations.",
                                    "Fast selection by player or team name."
                                ].map((text, i) => (
                                    <li key={i} className="flex items-start gap-4 text-slate-700 font-medium bg-slate-50 p-4 rounded-xl border-l-4 border-orange-400">
                                        <img src={tick} alt="✓" className="w-5 h-5 mt-1" />
                                        <span>{text}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* Section 3: Points Table */}
                <section className="py-20">
                    <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1 order-2 lg:order-1"
                        >
                            <h3 className="text-3xl md:text-5xl font-bold text-slate-800 mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-indigo-500">
                                Beautiful, Auto-generated Points Tables.
                            </h3>
                            <p className="text-slate-600 mb-8">Standings are calculated in real-time using your custom point system.</p>
                            <ul className="mb-10 space-y-3">
                                {[
                                    "Dedicated public standings page.",
                                    "Real-time updates after match entry.",
                                    "Export tables directly to high-quality images.",
                                    "Deep analytics insights included."
                                ].map((text, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-600">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                        <span>{text}</span>
                                    </li>
                                ))}
                            </ul>
                            <a href="https://battlefiesta.in/stat/6610e3f5c0c776d5020339ca" target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition-all active:scale-95">
                                See Demo ⮕
                            </a>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1 order-1 lg:order-2"
                        >
                            <img src={'https://res.cloudinary.com/dusxlxlvm/image/upload/v1731566361/battlefiesta/assets/icon/stats.webp'} alt="Stats" className="rounded-2xl w-full shadow-2xl skew-y-2 hover:skew-y-0 transition-transform duration-500" />
                        </motion.div>
                    </div>
                </section>

                {/* Section 4: Registration */}
                <section className="py-24 bg-slate-900 overflow-hidden relative">
                    {/* Background Blur */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-indigo-600/30 blur-[150px] -z-0" />
                    
                    <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative z-10">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="flex-1"
                        >
                            <img src={'https://res.cloudinary.com/dusxlxlvm/image/upload/v1717660387/battlefiesta/assets/icon/registrationform_byfrbe.webp'} alt="Registration" className="rounded-2xl w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10" />
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1"
                        >
                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                                Custom <span className="text-yellow-400">Registration Forms</span>
                            </h3>
                            <div className="space-y-4 mb-10">
                                {[
                                    "Accept emails, Discord, Phone #, etc.",
                                    "Native logo upload for teams & players.",
                                    "Integrated payment screenshot proof.",
                                    "Set min/max players per team.",
                                    "Organized registration approval dashboard."
                                ].map((text, i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl text-slate-300 backdrop-blur-sm flex gap-4">
                                        <span className="text-yellow-400 font-bold">0{i+1}</span>
                                        <span>{text}</span>
                                    </div>
                                ))}
                            </div>
                            <a href="https://battlefiesta.in/register/6610e3f5c0c776d5020339ca" target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 bg-yellow-400 text-slate-900 font-extrabold rounded-2xl hover:bg-yellow-300 transition-all hover:scale-105 shadow-lg shadow-yellow-400/20">
                                Live Preview 🔒
                            </a>
                        </motion.div>
                    </div>
                </section>
            </div>

            {/* CTA Section */}
            <section className="py-20 bg-indigo-600 text-center px-6">
                <div className="container mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to Level Up Your Tournaments?</h2>
                    <p className="text-indigo-100 text-xl mb-12 max-w-2xl mx-auto">Join thousands of organizers who use BattleFiesta to run their professional events.</p>
                    <NavLink to='/dashboard' className="px-12 py-5 bg-white text-indigo-600 font-extrabold text-xl rounded-full hover:shadow-2xl hover:scale-110 transition-all active:scale-95 inline-block">
                        Build For Free ➜
                    </NavLink>
                </div>
            </section>

            {/* Footer Divider (Simple wave) */}
            <div className="bg-indigo-600 text-white py-4 text-center text-sm font-medium">
                © {new Date().getFullYear()} BattleFiesta. Elevating Esports Everywhere.
            </div>
        </div>
    )
}

export default Home;