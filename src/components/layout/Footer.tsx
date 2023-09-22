import * as Icons from "heroicons-react";
import React from "react";
export default function Footer({
	dark,
}: {
	dark?: boolean;
}): React.ReactElement {
	return (
		<div className={dark ? "bg-gray-800" : "bg-white"}>
			<div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
				<div className="flex justify-center md:order-2">
					<p className={"text-gray-400 mr-6"}>Contact Us:</p>

					<a
						href="mailto:info@montavistamun.com"
						className={
							"text-gray-400 " +
							(dark
								? "hover:text-gray-300"
								: "hover:text-gray-500")
						}
					>
						<span className="sr-only">Email</span>
						<Icons.Mail className="h-6 w-6" />
					</a>
					<a
						href="https://www.instagram.com/mv.mun/"
						className={
							"ml-6 text-gray-400 " +
							(dark
								? "hover:text-gray-300"
								: "hover:text-gray-500")
						}
					>
						<span className="sr-only">Instagram</span>
						<svg
							className="h-6 w-6"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								fillRule="evenodd"
								d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
								clipRule="evenodd"
							/>
						</svg>
					</a>
					<a
						href="https://www.facebook.com/mvmodelun/"
						className={
							"ml-6 text-gray-400 " +
							(dark
								? "hover:text-gray-300"
								: "hover:text-gray-500")
						}
					>
						<span className="sr-only">Facebook</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />{" "}
						</svg>
					</a>
					<a
						href="https://discord.com/invite/5sN9WXa"
						className={
							"ml-6 text-gray-400 " +
							(dark
								? "hover:text-gray-300"
								: "hover:text-gray-500")
						}
					>
						<span className="sr-only">Discord</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="currentColor"
							viewBox="0 0 24 24"
							>
							<path
							fillRule="evenodd"
							d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" 
							clipRule="evenodd"
							/>

						</svg>
					</a>
				</div>
				<div className="mt-8 md:mt-0 md:order-1">
					<p className="text-center text-base leading-6 text-gray-400 hidden md:block">
						&copy; 2021 Monta Vista Model United Nations | Designed
						by Jeffrey Meng
					</p>
					<div className="md:hidden">
						<p className="text-center text-base leading-6 text-gray-400">
							&copy; 2021 Monta Vista Model United Nations
						</p>
						<p className="text-center text-base leading-6 text-gray-400">
							Designed by Jeffrey Meng
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
