import React, { useState } from "react";

const ToggleMateria = ({ materia, mesas, planDeEstudio }) => {
	const baseURL = "https://www.google.com/calendar/render?action=TEMPLATE";

	// Estado para controlar la visibilidad del contenido adicional
	const [isVisible, setIsVisible] = useState(false);

	// Función para alternar la visibilidad
	const toggleVisibility = () => {
		setIsVisible((prevState) => !prevState);
	};

	// Formato de fecha para mostrar de forma consistente
	const formatDate = (date) => new Date(date).toLocaleDateString("es-ES");

	return (
		<article className="flex flex-col gap-2.5 h-min w-full">
			<header className="bg-primary text-on-primary rounded-br-2xl rounded-bl-2xl p-1.5 flex flex-row gap-2.5 items-center w-full justify-center self-stretch shrink-0 relative">
				<h3 className="text-on-primary text-center text-headline-small relative flex-1 flex items-center justify-center text-pretty">
					{materia}
				</h3>

				<md-filled-tonal-icon-button toggle trailing-icon onClick={toggleVisibility}>
					{isVisible ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="currentColor">
							<path
								stroke="none"
								d="M0 0h24v24H0z"
								fill="none"
							/>
							<path d="M11.293 7.293a1 1 0 0 1 1.32 -.083l.094 .083l6 6l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059l-.002 .059l-.005 .058l-.009 .06l-.01 .052l-.032 .108l-.027 .067l-.07 .132l-.065 .09l-.073 .081l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002h-12c-.852 0 -1.297 -.986 -.783 -1.623l.076 -.084l6 -6z" />
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="currentColor">
							<path
								stroke="none"
								d="M0 0h24v24H0z"
								fill="none"
							/>
							<path d="M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-.118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z" />
						</svg>
					)}
				</md-filled-tonal-icon-button>
			</header>

			{isVisible && (
				<footer className="flex w-full flex-col sm:flex-row gap-2 p-2">
					{/* Información sobre las mesas */}
					<section className="md:w-full md:flex-1 border border-outline rounded-xl p-2 flex flex-col gap-2.5 items-center justify-start self-stretch shrink-0 relative overflow-hidden">
						{/*  */}
						<div className="bg-secondary text-on-secondary rounded-2xl p-2.5 flex flex-wrap gap-2.5 items-center justify-center self-stretch shrink-0 relative">
							{mesas?.length > 0 ? (
								<>
									<p className="text-title-medium relative flex-1 flex items-center text-nowrap justify-center">
										Próxima Mesa:
									</p>
									<p className="text-center text-title-small flex-1 relative flex items-center justify-center">
										{mesas[0].fecha > new Date() ? formatDate(mesas[0].fecha,) : formatDate(new Date(),)}
									</p>
								</>
							) : (
								<p className="text-title-medium relative flex-1 flex items-center justify-center">
									No hay fechas
								</p>
							)}
						</div>
						<div className="flex flex-wrap gap-2.5 w-full">
							<md-filled-tonal-button disabled={!mesas?.length} className="w-full flex-1 text-on-primary">
								Ver Mas
							</md-filled-tonal-button>
							{/* <md-dialog>
								<div slot="headline">
									Dialog title
								</div>
								<form slot="content" id="form-id" method="dialog">
									A simple dialog with free-form content.
								</form>
								<div slot="actions">
									<md-text-button form="form-id">Ok</md-text-button>
								</div>
							</md-dialog> */}
							<md-filled-button
								href={mesas?.length > 0 && mesas[0]?.fecha ? `${baseURL}&text=Mesa+de+${materia}&dates=${new Date(mesas[0].fecha).toISOString().replace(/-|:|\.\d+/g, "")}` : "#"}
								target="_blank" rel="noopener noreferrer" className="w-full flex-1" disabled={!mesas?.length}>
								Agendar
							</md-filled-button>
						</div>
					</section>

					{/* Información sobre el plan de estudio */}
					<section className="md:w-full md:flex-1 border border-outline rounded-xl p-2 flex flex-col gap-2.5 items-center justify-start self-stretch shrink-0 relative overflow-hidden">
						<header className="bg-secondary text-on-secondary rounded-2xl p-2.5 flex flex-col lg:flex-row gap-2.5 items-center justify-center self-stretch shrink-0 relative">
							<p className="text-title-medium relative self-stretch flex items-center justify-center">
								Plan de Estudio:
							</p>
						</header>

						<footer className="flex flex-wrap gap-2.5 items-start justify-start self-stretch shrink-0 relative">
							<md-filled-tonal-button disabled={!planDeEstudio} className="w-1/2 flex-1 sm:w-full text-on-primary">
								Ver
							</md-filled-tonal-button>
							<md-elevated-button disabled={!planDeEstudio} className="w-1/2 flex-1 sm:w-full">
								Descargar
							</md-elevated-button>
						</footer>
					</section>
				</footer>
			)}
		</article>
	);
};

export default ToggleMateria;
