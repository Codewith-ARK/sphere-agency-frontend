'use client'
import { useCampaign } from "@/context/CampaignProvider";
import {
    Document,
    Page,
    PDFDownloadLink,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";
import dayjs from "dayjs";
import { FileDown } from "lucide-react";
import { ArrowDown } from "lucide-react";
import React from "react";

export default function GenerateContractButton({ props }) {
    const { campaign } = useCampaign();
    if (!campaign) return <button disabled={true} className="btn"><span className="loading"></span> Loading...</button>

    return (
        <button className="btn btn-primary rounded-md gap-3">
            <PDFDownloadLink
                document={<ContractPDFTemplate props={campaign} />}
                fileName="contract.pdf"
            >
                Download PDF
            </PDFDownloadLink>
            <FileDown size={18} />
            {/* <ArrowDown size={18} />s */}
        </button>
    );
}

const styles = StyleSheet.create({
    page: {
        paddingVertical: 48,
        paddingHorizontal: 24,
        display: "flex",
        flexDirection: "column",
        gap: 24,
    },
    header: { display: 'flex', flexDirection: "column", justifyContent: 'center' },
    headerText: { textAlign: "center", fontSize: 18, fontWeight: "bold", },
    bold: { fontWeight: "bold" },
    normalText: { fontSize: 12, fontWeight: 400 },
    sectionHeading: { fontWeight: "bold", fontSize: 18 },
    clauseHeading: { fontSize: 16, fontWeight: "bold" },
    margin: { marginVertical: 2 }
});

export function ContractPDFTemplate({ props }) {
    const { title, agencyName, created_by, type, created_at, contract } = props
    const createdAt = dayjs(created_at).format('DD/MMM/YYYY');

    return (
        <Document author={"Agency Sphere"} title={title || "Agency Sphere - Contract"} pageLayout="singlePage">
            <Page size={"a4"} style={styles.page}>
                <View id="contract-header" style={styles.header}>
                    <Text style={styles.headerText}>Agency Sphere</Text>
                    <Text style={styles.headerText}>Client Service Agreement</Text>
                </View>
                <View id="client-info">
                    <BoldTextWithContent heading={"Client"} value={created_by.name || "N/A"} />
                    <BoldTextWithContent heading={"Campaign Type"} value={type || "N/A"} />
                    <BoldTextWithContent heading={"Date"} value={createdAt} />
                </View>

                {contract.clauses.map((item, index) => <Clause
                    key={item.id}
                    clauseTitle={item.title}
                    clauseText={item.text}
                    explanationText={item.explanation}
                />)}

                <View>
                    <Text style={[styles.normalText, styles.margin]}>Client Signatures:_____________</Text>
                    <Text style={[styles.normalText, styles.margin]}>Agency Sphere Signatures:_____________</Text>
                </View>
            </Page>
        </Document>
    );
}

function Clause({ clauseText, explanationText, clauseTitle }) {

    const customStyle = StyleSheet.create({
        margin: { marginVertical: 6 }
    })

    return (
        <View style={customStyle.margin}>
            <Text style={styles.clauseHeading}>{clauseTitle}</Text>
            <Text style={styles.normalText}>{clauseText}</Text>
            <BoldTextWithContent heading={"Explanation"} value={explanationText} />
        </View>
    )
}

function BoldTextWithContent({ heading, value }) {

    const styles = StyleSheet.create({
        textBase: { fontSize: 12 },
        fontBold: { fontWeight: 700 },
        fontBase: { fontWeight: 400 },
        flex: { display: "flex" },
        gap: { gap: 12 }
    })

    return (
        <Text>
            <Text style={[styles.fontBold, styles.textBase]}>{heading}:</Text>{' '}
            <Text style={styles.textBase}>{value}</Text>
        </Text>
    );
}

function TemplateSectionHeading({ text }) {
    // const styles = {
    //     textBold: {
    //         fontWeight: "bold",
    //         fontSize: 18,
    //     }
    // }
    return <Text style={styles.bold}>{text}</Text>;
}
