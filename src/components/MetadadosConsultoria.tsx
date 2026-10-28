import { Helmet } from "react-helmet-async";

interface PropriedadesMetadadosConsultoria {
  título: string;
  descrição: string;
  endereço: string;
  tipo?: "website" | "profile";
  dadosEstruturados: Record<string, unknown>;
}

export default function MetadadosConsultoria({
  título,
  descrição,
  endereço,
  tipo = "website",
  dadosEstruturados,
}: PropriedadesMetadadosConsultoria) {
  const imagemCompartilhamento =
    "https://douglaspaiani.com.br/consultoria/paiani-team.png";

  return (
    <Helmet>
      <title>{título}</title>
      <meta name="description" content={descrição} />
      <meta name="author" content="Douglas Paiani" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="theme-color" content="#090909" />
      <link rel="canonical" href={endereço} />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/consultoria/favicon-halter.png"
      />
      <link
        rel="icon"
        type="image/svg+xml"
        sizes="any"
        href="/consultoria/favicon-halter.svg"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/consultoria/apple-touch-icon-halter.png"
      />
      <meta property="og:type" content={tipo} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Paiani Team" />
      <meta property="og:title" content={título} />
      <meta property="og:description" content={descrição} />
      <meta property="og:url" content={endereço} />
      <meta property="og:image" content={imagemCompartilhamento} />
      <meta property="og:image:secure_url" content={imagemCompartilhamento} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1536" />
      <meta property="og:image:height" content="1024" />
      <meta
        property="og:image:alt"
        content="Paiani Team — Consultoria esportiva com Douglas Paiani"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={título} />
      <meta name="twitter:description" content={descrição} />
      <meta name="twitter:image" content={imagemCompartilhamento} />
      <meta
        name="twitter:image:alt"
        content="Paiani Team — Consultoria esportiva com Douglas Paiani"
      />
      <script type="application/ld+json">
        {JSON.stringify(dadosEstruturados).replace(/</g, "\\u003c")}
      </script>
    </Helmet>
  );
}
