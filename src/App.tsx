import { useEffect, useRef } from "react";
import { useFirmamentoScene } from "./lib/use-firmamento-scene";
import { useProcessScene } from "./lib/use-process-scene";
import MorphicNavbar from "./components/kokonutui/morphic-navbar";

const navItems = [
	["Portfólio", "#portfolio"],
	["Como funciona", "#processo"],
	["Sobre", "#sobre"],
	["Contato", "#contato"],
] as const;

const steps = [
	[
		"01",
		"Entender a ideia",
		"Você chega com uma intenção, mesmo que ainda esteja em construção. A primeira etapa é transformar a confusão em direção.",
	],
	[
		"02",
		"Mapear o problema",
		"Definimos o que precisa existir para resolver de verdade — site, sistema, ferramenta ou experiência digital clara.",
	],
	[
		"03",
		"Criar a solução",
		"Desenvolvemos uma proposta navegável para você ver, validar e ajustar antes de investir em qualquer linha de código final.",
	],
	[
		"04",
		"Desenvolver",
		"A solução vira produto real: lógica, integrações, UX, testes e cuidado em cada detalhe que impacta a experiência.",
	],
	[
		"05",
		"Testar e ajustar",
		"Revisamos junto com você até que a entrega esteja clara, funcional e pronta.",
	],
	[
		"06",
		"Colocar no mundo",
		"Publicamos, conectamos o projeto e acompanhamos a etapa de lançamento com cuidado.",
	],
] as const;

function Actions() {
	return (
		<div className="actions">
			<a href="#contato">
				<button className="btn-primary">Falar com o estúdio</button>
			</a>
			<a href="#portfolio">
				<button className="btn-ghost">Ver portfólio</button>
			</a>
		</div>
	);
}

function Navigation() {
	const items = Object.fromEntries(
		navItems.map(([label, href]) => [href, { name: label }]),
	);
	return (
		<MorphicNavbar
			items={items}
			defaultPath="#portfolio"
			className="firmamento-morphic-navbar"
			logo={
				<a className="firmamento-navbar-logo" href="#top">
					FIRMAMENTO ESTÚDIO
				</a>
			}
		/>
	);
}

function Hero() {
	const heroRef = useRef<HTMLElement>(null);
	useFirmamentoScene(heroRef);
	return (
		<section
			ref={heroRef}
			className="scroll-stage"
			aria-label="Viagem pelo Firmamento"
		>
			<div className="scroll-viewport">
				<div className="travel-copy">
					<div className="section-label">Viagem pelo Firmamento</div>
					<h1>
						Você tem uma ideia.
						<br />
						Eu transformo em <em>produto</em>.
					</h1>
					<p>
						Sites, sistemas e ferramentas com estratégia, design e tecnologia — do
						primeiro rascunho ao lançamento real.
					</p>
					<Actions />
				</div>
				<div className="orbital-system" aria-hidden="true">
					<div className="orbit-ring orbit-ring-wide" />
					<div className="orbit-ring orbit-ring-tall" />
					<div className="orbit-core" />
				</div>
				<div className="tunnel-nodes" aria-hidden="true" />
				<div className="flash" aria-hidden="true" />
				<div className="scroll-cue">
					role para atravessar <span>↓</span>
				</div>
			</div>
		</section>
	);
}

function Portfolio() {
	return (
		<section id="portfolio" className="portfolio-shell">
			<div className="section-label">Portfólio</div>
			<h2 className="section-title">
				Uma ideia que saiu do papel e foi para o mercado.
			</h2>
			<div
				className="case-card"
				data-project="Multiplicador de Ideias"
				data-reveal
			>
				<div className="case-top">
					<span className="project-dot" aria-hidden="true" />
					<span className="case-name">Multiplicador de Ideias</span>
					<span className="case-tag">SaaS · em produção</span>
				</div>
				<p className="case-desc">
					Plataforma criada para ajudar criadores de conteúdo a transformar uma única
					ideia em dezenas de possibilidades de publicação. O projeto passou por
					planejamento, arquitetura, design e desenvolvimento até chegar ao produto
					real, com assinatura recorrente, SEO estruturado e um funil próprio para
					atrair usuários desde a primeira etapa.
				</p>
				<div className="case-meta">
					<div>
						<strong>5 meses</strong>do planejamento ao lançamento
					</div>
					<div>
						<strong>10 plataformas</strong>de conteúdo geradas por ideia
					</div>
					<div>
						<strong>Stripe</strong>assinaturas recorrentes integradas
					</div>
				</div>
				<a
					className="case-link"
					href="https://multiplicadordeideias.lovable.app"
					target="_blank"
					rel="noreferrer"
				>
					ver o projeto no ar →
				</a>
			</div>
		</section>
	);
}

function Process() {
	const processRef = useRef<HTMLDivElement>(null);
	useProcessScene(processRef);

	return (
		<section id="processo" className="process-scene">
			<div className="process-stage" ref={processRef}>
				<div className="process-viewport">
					<div className="process-header">
						<div className="section-label">Como funciona</div>
						<h2 className="process-title section-title">
							De uma ideia ainda confusa a um produto pronto para crescer.
						</h2>
					</div>
					<div className="process-steps" aria-live="polite">
						{steps.map(([number, title, description]) => (
							<div className="process-step step" key={number}>
								<div className="step-num">{number}</div>
								<div className="step-body">
									<h3>{title}</h3>
									<p>{description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

function About() {
	return (
		<section id="sobre">
			<div className="section-label">Sobre</div>
			<h2 className="section-title">Quem constrói</h2>
			<div className="about">
				<p>
					<strong>Sou Jhonathan</strong>, estudante de Sistemas de Informação e a
					pessoa por trás da Firmamento Estúdio. Programo, mas também penso em
					produto — cada projeto passa por planejamento, design e testes antes de
					qualquer entrega.
				</p>
				<p>
					Uso inteligência artificial como ferramenta de trabalho, não como atalho:
					ela acelera pesquisa, prototipação e partes da programação, mas as decisões
					de direção, criatividade e qualidade continuam sendo minhas, em conversa
					direta com quem contrata.
				</p>
			</div>
		</section>
	);
}

function Contact() {
	return (
		<section className="contact" id="contato">
			<div
				className="orbit-wrap"
				style={{ right: "50%", transform: "translate(50%, -50%)", opacity: 0.35 }}
			>
				<div className="ring ring-2" />
				<div className="ring ring-1" />
			</div>
			<h2>
				Tem um projeto em mente?
				<br />
				<em>Vamos construir.</em>
			</h2>
			<p>
				Conte o que você precisa e eu te digo como transformar essa ideia em algo
				real.
			</p>
			<div className="actions">
				<a href="https://wa.me/55" target="_blank" rel="noreferrer">
					<button className="btn-primary">Agendar uma conversa</button>
				</a>
			</div>
		</section>
	);
}

function Footer() {
	return (
		<footer>
			<div className="footer-top">
				<div className="footer-brand">
					<span className="logo">FIRMAMENTO ESTÚDIO</span>
					<p>
						Um estúdio de criação digital: sites, sistemas e ferramentas que
						transformam ideias em produtos reais.
					</p>
				</div>
				<div className="footer-cols">
					<div className="footer-col">
						<h4>Navegação</h4>
						{navItems.map(([label, href]) => (
							<a key={href} href={href}>
								{label}
							</a>
						))}
					</div>
					<div className="footer-col">
						<h4>Redes</h4>
						<a
							href="https://www.instagram.com/firmamentoestudio/"
							target="_blank"
							rel="noreferrer"
						>
							Instagram
						</a>
						<a href="https://github.com/Gugs235" target="_blank" rel="noreferrer">
							GitHub
						</a>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<span>
					© <span data-current-year /> Firmamento Estúdio
				</span>
				<span>Campo Grande, MS</span>
			</div>
		</footer>
	);
}

export default function App() {
	useEffect(() => {
		document.title = "Firmamento Estúdio";
	}, []);
	return (
		<>
			<canvas className="starfield-bg" aria-hidden="true" />
			<div id="top" />
			<Navigation />
			<main>
				<Hero />
				<Portfolio />
				<Process />
				<About />
				<Contact />
			</main>
			<Footer />
		</>
	);
}
