import React, { useState } from "react";
import { Layout, Main } from "../components/layout";
import Header from "../components/Header";
import guideData, { GuideSection } from "../components/guide/guideData";
import { graphql } from "gatsby";
import { FluidObject } from "gatsby-image";

interface GuidePageProps {
	data: {
		headerImage: {
			childImageSharp: {
				fluid: FluidObject;
			};
		};
	};
}


export default function GuidePage({ data }: GuidePageProps): React.ReactElement {
	const [searchTerm, setSearchTerm] = useState("");
	const [expandedSections, setExpandedSections] = useState<string[]>([guideData[0].id]);

	const toggleSection = (sectionId: string) => {
		setExpandedSections(prev => 
			prev.includes(sectionId) 
				? prev.filter(id => id !== sectionId)
				: [...prev, sectionId]
		);
	};

	const expandAll = () => {
		setExpandedSections(guideData.map(section => section.id));
	};

	const collapseAll = () => {
		setExpandedSections([]);
	};

	const filteredData = guideData.filter(section => {
		const searchLower = searchTerm.toLowerCase();
		const titleMatch = section.title.toLowerCase().includes(searchLower);
		const contentMatch = section.content?.toString().toLowerCase().includes(searchLower);
		const subsectionMatch = section.subsections?.some(sub => 
			sub.title.toLowerCase().includes(searchLower) || 
			sub.content?.toString().toLowerCase().includes(searchLower)
		);
		return titleMatch || contentMatch || subsectionMatch;
	});

	return (
		<Layout title="MUN Guide" description="Comprehensive guide to Model United Nations procedures, committees, and strategies">
			<Header 
				title="MUN Guide" 
				backgroundImage={data.headerImage}
			>
				<p className="text-xl text-white/90 max-w-3xl mx-auto text-center">
					Your comprehensive resource for mastering Model UN procedures, strategies, and success tips
				</p>
			</Header>
			<Main>
				<div className="max-w-5xl mx-auto">
					{/* Search and Controls */}
					<div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<div className="flex flex-col md:flex-row gap-4">
							<div className="flex-1">
								<input
									type="text"
									placeholder="Search guide topics..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
								/>
							</div>
							<div className="flex gap-2">
								<button
									onClick={expandAll}
									className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
								>
									Expand All
								</button>
								<button
									onClick={collapseAll}
									className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
								>
									Collapse All
								</button>
							</div>
						</div>
					</div>

					{/* Section Cards */}
					<div className="space-y-4">
						{filteredData.map((section) => (
							<div key={section.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
								<button
									onClick={() => toggleSection(section.id)}
									className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-colors"
								>
									<h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
									<svg
										className={`w-5 h-5 text-gray-600 transition-transform ${
											expandedSections.includes(section.id) ? "rotate-180" : ""
										}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								</button>
								
								{expandedSections.includes(section.id) && (
									<div className="p-6">
										<div className="prose max-w-none text-gray-600 mb-4">
											{section.content}
										</div>
										
										{section.subsections && (
											<div className="grid md:grid-cols-2 gap-4 mt-4">
												{section.subsections.map((subsection) => (
													<div 
														key={subsection.id} 
														className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200 ${
															subsection.title.includes("Crisis") ? "md:col-span-2" : ""
														}`}
													>
														<h3 className="text-lg font-semibold text-gray-900 mb-3">
															{subsection.title}
														</h3>
														<div className="prose prose-sm max-w-none text-gray-600">
															{subsection.content}
														</div>
													</div>
												))}
											</div>
										)}
									</div>
								)}
							</div>
						))}
					</div>

					{filteredData.length === 0 && (
						<div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
							<p className="text-gray-500 text-lg">No guide sections match your search.</p>
						</div>
					)}
				</div>
			</Main>
		</Layout>
	);
}

export const query = graphql`
	query GuidePageQuery {
		headerImage: file(relativePath: { eq: "headers/recropped.JPG" }) {
			childImageSharp {
				fluid(maxWidth: 1200, quality: 90) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
	}
`;