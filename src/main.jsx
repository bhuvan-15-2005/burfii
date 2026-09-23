import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import { HashRouter, useLocation, useNavigate } from 'react-router-dom'
import { ArrowDownRight, ArrowRight, Instagram, MapPin, Menu, X } from 'lucide-react'
import './styles.css'

const A = `${import.meta.env.BASE_URL}pictures/`
const images = {
  hero: `${A}cream1.png`,
  cone: `${A}hero-scoop.jpg`,
  tubs: `${A}special.jpg`,
  cones: `${A}hero-cup-1.jpg`,
  celebration: `${A}celebration.jpg`,
  classic: `${A}classic.jpg`,
  swirl: `${A}d3c4f24cfdbc4c48d71c436d3e486087.jpg`,
  scoop: `${A}83d1762e87d8a284f9a92ce656464d35.jpg`,
  colorful: `${A}196fd2167f8093427104b805bc0b3d4c.jpg`,
  extra: `${A}051e855ad55c89df812ba5dfebb2440f.jpg`,
}

const navItems = ['Home', 'Flavors', 'About Us', 'Gallery']
const flavors = [
  { name: 'Sitaphal', note: 'Natural fruit flavor · creamy', color: 'pink', image: images.cones },
  { name: 'Korean buns', note: 'A BURFII favorite · soft & sweet', color: 'yellow', image: images.scoop },
  { name: 'Sundae mood', note: 'Colorful toppings · pure joy', color: 'mint', image: images.tubs },
]
const gallery = [images.colorful, images.cone, images.celebration, images.classic, images.swirl, images.extra]

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function App() {
  const location = useLocation()
  const routerNavigate = useNavigate()
  const page = location.pathname.replace(/^\//, '') || 'home'
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const navigate = (item) => {
    const next = item.toLowerCase().replace(' ', '-')
    routerNavigate(next === 'home' ? '/' : `/${next}`)
    setMenuOpen(false)
    setLightbox(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const content = page === 'home' ? <Home navigate={navigate} openLightbox={setLightbox} /> : page === 'flavors' ? <Flavors navigate={navigate} /> : page === 'about-us' ? <About navigate={navigate} /> : <Gallery openLightbox={setLightbox} />

  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="brand" onClick={() => navigate('Home')} aria-label="BURFII home">
          <img src={`${A}logo/logo.png`} alt="" />
          <img className="brand-name" src={`${A}logo/brand_name.png`} alt="BURFII" />
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(item => <button key={item} className={page === item.toLowerCase().replace(' ', '-') ? 'active' : ''} onClick={() => navigate(item)}>{item}</button>)}
        </nav>
        <button className="visit-button" onClick={() => scrollToId('visit')}>Find a scoop <ArrowRight size={16} /></button>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      </header>
      <AnimatePresence>{menuOpen && <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>{navItems.map(item => <button key={item} onClick={() => navigate(item)}>{item}</button>)}<button onClick={() => { setMenuOpen(false); scrollToId('visit') }}>Find a scoop <ArrowRight size={16} /></button></motion.nav>}</AnimatePresence>
      <main>{content}</main>
      <AnimatePresence>{lightbox && <Lightbox image={lightbox} onClose={() => setLightbox(null)} />}</AnimatePresence>
    </div>
  )
}

function Home({ navigate, openLightbox }) {
  return <>
    <section className="hero section-wrap">
      <div className="hero-copy">
        <h1>Good moods<br /><span>served cold.</span></h1>
        <p className="hero-text">Joyfully made scoops, swirls and treats for the sweetest part of your day.</p>
        <div className="button-row"><button className="button button-dark" onClick={() => navigate('Flavors')}>Explore flavors <ArrowRight size={17} /></button><button className="text-button" onClick={() => scrollToId('about')}>Our little story <ArrowDownRight size={18} /></button></div>
        <div className="hero-stats"><div><strong>Unique</strong><span>flavor ideas</span></div><div><strong>Fruit-led</strong><span>natural flavors</span></div></div>
      </div>
      <div className="hero-art"><div className="sun-disc" /><div className="doodle doodle-star">✦</div><motion.img initial={{ opacity: 0, y: 28, rotate: -4 }} animate={{ opacity: 1, y: 0, rotate: 2 }} transition={{ duration: .8, delay: .15 }} src={images.hero} alt="A colorful strawberry, vanilla and chocolate ice cream cone" /><div className="sticker">you<br /><b>deserve</b><br />a treat <span>♥</span></div></div>
    </section>
    <section className="intro section-wrap" id="about"><div className="intro-grid"><h2>A little extra<br /><em>sweetness</em> never hurt.</h2><div><p className="large-copy">BURFII is a colorful ice cream parlour known for varied flavors, natural fruit flavors, Korean buns and sundaes.</p><button className="arrow-link" onClick={() => navigate('About Us')}>Meet BURFII <ArrowRight size={17} /></button></div></div></section>
    <section className="flavor-section section-wrap"><div className="section-heading"><div><h2>Flavors for<br /><em>every feeling.</em></h2></div><button className="circle-arrow" onClick={() => navigate('Flavors')} aria-label="See all flavors"><ArrowUpRight /></button></div><div className="flavor-grid">{flavors.map((flavor) => <motion.article className={`flavor-card ${flavor.color}`} key={flavor.name} whileHover={{ y: -8 }}><div className="flavor-image"><img src={flavor.image} alt={flavor.name} /></div><div className="flavor-info"><h3>{flavor.name}</h3><p>{flavor.note}</p></div></motion.article>)}</div></section>
    <section className="special-section section-wrap"><div className="special-image"><img src={images.cone} alt="Colorful BURFII ice cream" /></div><div className="special-copy"><h2>Big scoop<br /><em>energy.</em></h2><p>From natural fruit flavors to Korean buns and sundaes, there is always something colorful to discover.</p><button className="button button-pink" onClick={() => navigate('Flavors')}>See the flavors <ArrowRight size={17} /></button></div></section>
    <section className="why-section section-wrap"><h2>Made for<br /><em>happy cravings.</em></h2><div className="why-grid"><Reason title="Varied flavors" text="A colorful menu with unique combinations to keep every visit interesting." /><Reason title="Natural fruit" text="Fruit-led flavors such as Sitaphal bring a bright, familiar sweetness." /><Reason title="More than scoops" text="Korean buns, sundaes and takeaway treats for every kind of craving." /></div></section>
    <GalleryPreview openLightbox={openLightbox} navigate={navigate} />
    <Visit />
    <Footer />
  </>
}

function Reason({ title, text }) { return <div className="reason"><h3>{title}</h3><p>{text}</p></div> }
function GalleryPreview({ openLightbox, navigate }) { return <motion.section className="preview-section section-wrap" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .65 }}><div className="section-heading"><div><h2>Scoop, smile,<br /><em>repeat.</em></h2></div><button className="arrow-link" onClick={() => navigate('Gallery')}>Open the gallery <ArrowRight size={17} /></button></div><div className="preview-grid">{gallery.slice(0, 4).map((image, i) => <motion.button key={image} className={`preview-image p${i + 1}`} onClick={() => openLightbox(image)} whileHover={{ scale: 1.02 }}><img src={image} alt="BURFII ice cream moment" /></motion.button>)}</div></motion.section> }
function Visit() { return <motion.section className="visit-section" id="visit" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .7 }}><div className="visit-inner section-wrap"><div><h2>Your happy place<br /><em>is right here.</em></h2><p>Drop in for a scoop, stay for the good vibes.</p></div><motion.div className="address" whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 250, damping: 18 }}><MapPin size={21} /><div><strong>BURFII Ice Cream Parlour</strong><span>12 Sunshine Lane, Bengaluru</span><span>Open daily · 12 pm — 11 pm</span></div><button className="round-button" aria-label="Get directions"><ArrowUpRight /></button></motion.div></div></motion.section> }
function Footer() { return <footer><div className="footer-logo"><img src={`${A}logo/logo.png`} alt="" /><span>BURFII</span></div><p>Small scoops. Big feelings.</p><a href="https://instagram.com" aria-label="Instagram"><Instagram size={20} /></a><small>© 2026 BURFII. Made for happy days.</small></footer> }

function Flavors({ navigate }) { return <PageHero eyebrow="The flavor board" title={<>Choose your<br /><em>happy.</em></>} intro="From nostalgic classics to bright new favorites, every batch is made to put a little spring in your step." image={images.tubs}><section className="flavor-list section-wrap">{flavors.concat([{ name: 'Chocolate brownie', note: 'Fudge brownie · extra rich', color: 'blue', image: images.cone }, { name: 'Pistachio picnic', note: 'Roasted pistachio · creamy', color: 'pink', image: images.classic }]).map(flavor => <article className={`flavor-row ${flavor.color}`} key={flavor.name}><img src={flavor.image} alt={flavor.name} /><div><h3>{flavor.name}</h3><p>{flavor.note}</p></div><ArrowUpRight /></article>)}</section><div className="center-cta"><p>Have a flavor idea?</p><button className="arrow-link" onClick={() => navigate('About Us')}>Tell us everything <ArrowRight size={17} /></button></div><Footer /></PageHero> }
function About({ navigate }) { return <PageHero title={<>Born from<br /><em>good stuff.</em></>} intro="BURFII started with a simple idea: make the kind of ice cream that makes you stop mid-sentence for another bite." image={images.celebration}><section className="about-story section-wrap"><div className="about-photo"><img src={images.classic} alt="Fresh ice cream cones" /></div><div><h2>For the<br /><em>joy seekers.</em></h2><p className="large-copy">We are a small, independent parlour obsessed with making ordinary days feel a little more special. Our scoops are churned in small batches, our toppings are generous and our door is always open.</p><button className="button button-dark" onClick={() => navigate('Gallery')}>See the good stuff <ArrowRight size={17} /></button></div></section><section className="values section-wrap"><Reason title="Made with care" text="Thoughtful recipes, real fruit and a whole lot of stirring." /><Reason title="Made for sharing" text="Big tables, little spoons and an extra napkin, always." /><Reason title="Made to surprise" text="Because the best flavor is the one you didn't expect." /></section><Visit /><Footer /></PageHero> }
function Gallery({ openLightbox }) { return <PageHero eyebrow="The BURFII album" title={<>Proof that<br /><em>joy is edible.</em></>} intro="A few of our favorite scoops, smiles and wonderfully messy moments." image={images.colorful}><section className="gallery-page section-wrap">{gallery.map((image, i) => <motion.button key={image} className={`gallery-tile tile-${i + 1}`} onClick={() => openLightbox(image)} whileHover={{ scale: 1.02 }}><img src={image} alt="BURFII gallery moment" /><span>View moment <ArrowUpRight size={16} /></span></motion.button>)}</section><Footer /></PageHero> }
function PageHero({ title, intro, image, children }) { return <><section className="page-hero section-wrap"><div><h1>{title}</h1><p className="hero-text">{intro}</p></div><div className="page-hero-image"><img src={image} alt="BURFII ice cream" /></div></section>{children}</> }
function Lightbox({ image, onClose }) { return <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}><button className="lightbox-close" onClick={onClose} aria-label="Close image"><X /></button><img src={image} alt="Enlarged BURFII ice cream moment" onClick={event => event.stopPropagation()} /></motion.div> }
function ArrowUpRight() { return <ArrowRight className="arrow-up-right" size={19} /> }

export default App

createRoot(document.getElementById('root')).render(<HashRouter><App /></HashRouter>)
