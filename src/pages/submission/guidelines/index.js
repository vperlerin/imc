import PageContain from "components/page-contain";
import React from "react";
import { conferenceData as cf } from "data/conference-data";
import { formatFullDate } from "utils/date";
import { Link } from "react-router-dom";

const LatexTemplate = "/files/Latex-Template.zip";
const LatexStyle = "/files/imc.sty";
const MSWordTemplate = "/files/MSWord-Template.docx";

const Guidelines = () => {
  return (
    <PageContain title="Submission and Proceedings Guidelines">
      <div className="text-danger fw-bolder mt-3 mb-4">
        For ALL IMC presentations (poster or lecture), a paper for the IMC Proceedings is mandatory. Only in case of a specific reason, e.g., information of confidential nature related to submission in a professional journal, exceptions will be honored.
      </div>

      <p>If you intend to have a presentation at the IMC, please:</p>
      <ul>
        <li>Remember the purpose of the IMC: the IMC is an annual meeting of the most active amateur meteor workers and professionals with the purpose to inform each other about the ongoing work directly related to the activities of the amateur community.</li>
        <li>Do not register a presentation without having a topic: registrations such as 'TBD' will be removed.</li>
        <li>You can register a presentation at any time, with your IMC registration or via email. Deadline for the registration of presentations is <span className="fw-bolder text-danger">{formatFullDate(cf.deadlines.reg, true, true)}</span>.</li>
        <li><b>It is strongly recommended</b> to have your paper ready before the IMC and submitted in order to allow the editors to discuss any issues with your paper during the IMC. <span className="fw-bolder text-danger"> Absolute deadline to submit {cf.year} IMC papers is {formatFullDate(cf.deadlines.paper, true, true)}</span>. Respecting this deadline is just a matter of starting to work on your paper in time. <b>Help the editors of the Proceedings and do not cause delay!</b></li>
        <li>More lecture time may be solicited than available. The SOC may propose to consider a poster rather than a lecture. Presentations that are not in line with the aim of the IMC may be rejected.</li>
      </ul>

      <p>
        All messages regarding the IMC program and the IMC Proceedings should be addressed to the{' '}
        <Link className="fw-bolder" aria-label="Contact" to="/contact" title="Contact">
          Scientific Organization Committee
        </Link>.
      </p>

      <div className="rounded-2 p-3 border border-2 mb-4">
        Proceedings are a crucial key to justify the efforts invested in a conference. Timely publication of the papers is essential. We insist that you do not postpone your paper. Delivery of papers before the conference is very much appreciated.
      </div>

      <h2>Topics</h2>
      <p>
        Presentations should be related to the domain of{' '}
        <Link className="fw-bolder" aria-label="Topics" to="/submission/topics" title="Topics">
          meteor astronomy
        </Link>, off-topic items cannot be admitted.
      </p>

      <h2 className="mt-4">Lectures and posters</h2>
      <p>
        For each lecture or poster presented at the IMC, a paper for Proceedings is mandatory. Only in case of a specific reason, e.g., information of confidential nature related to submission in a professional journal, exceptions will be honored.
      </p>

      <p>
        All presentations must be registered by the deadline of{' '}
        <span className="fw-bolder text-danger">{formatFullDate(cf.deadlines.reg, true, true)}</span> either via your registration form or later by updating your IMC registration by{' '}
        <Link aria-label="Contact" className="fw-bolder" to="/contact" title="Contact">
          contacting us
        </Link>. No unannounced topics will be admitted at the conference. All presentations must be in English. Lectures have a minimum duration of 10 and a maximum of 30 minutes, including 2-3 minutes for questions or comments. Although the SOC will do its utmost best to accommodate all lectures, they may propose a reduced time slot or, in some cases, a poster rather than a lecture.
      </p>

      <p>
        Many contributions are less suitable for a lecture; the poster session offers a valuable alternative to present topics without the constraints of an oral presentation.
      </p>

      <p>The poster panel dimension at the conference venue is {cf.poster_dim}.</p>

      <h2 className="mt-4">Instructions for all authors</h2>
      <ul>
        <li>The quality control of the IMC as a scientific and technical conference may exclude questionable or off-topic presentations.</li>
        <li>
          People with a presentation are required to deliver their paper before{' '}
          <span className="fw-bolder text-danger">{formatFullDate(cf.deadlines.paper, true, true)}</span>. If you have any issues with this deadline, please{' '}
          <Link aria-label="Contact" className="fw-bolder" to="/contact" title="Contact">
            contact us
          </Link>{' '}
          to agree on another deadline in our planning. Otherwise, send your paper to the {cf.year} IMC Proceedings editors.
        </li>
      </ul>

      <div className="rounded-2 p-3 border border-2 mb-4">
        {/*
          <p>
            The {cf.year} IMC Proceedings will be prepared in PDFLaTeX. Those familiar with PDFLaTeX are encouraged to use the template available in{' '}
            <a href={LatexTemplate} download>
              this archive
            </a>, which also contains a sample article. Those who are less familiar with PDFLaTeX are welcome to submit their article in Word. The editors will then convert your article to PDFLaTeX. Word users SHOULD use{' '}
            <a href={MSWordTemplate} download>
              this document
            </a>{' '}
            to format their article in the style of proceedings. To avoid compatibility issues, please save the Word file as "Word 2007" or earlier. Feel free to{' '}
            <Link aria-label="Contact" to="/contact" title="Contact">
              contact us
            </Link>{' '}
            if you need help.
          </p>

          <p>If reworking a previous paper (written according to these guidelines), please update the header:</p>
          <ul>
            <li>
              For Word users: "Proceedings of the IMC, {cf.location}, {cf.year}"
              <br />
              <i>Note:</i> Copy this header on the first two pages to ensure it appears on all subsequent odd and even-numbered pages.
            </li>
            <li>
              For LaTeX users: include the following{' '}
              <a href={LatexStyle} download>
                sty file
              </a>.
              <br />
              <i>Note:</i> Insert the line <code>\usepackage{"{imc}"}</code> just above <code>\begin{"{document}"}</code>.
              <br />
              Please provide a separate link to  <a href={LatexStyle} download>
                imc.sty
              </a>.
            </li>
          </ul>
        */}
        The Proceedings of the IMC {cf.year} will be published in WGN, the journal of the IMO.
        Please follow the guidelines in <a className="fw-bolder" href="https://www.imo.net/docs/writingforwgn.pdf" target="_blank" rel="noopener noreferrer">this document</a> to prepare your paper.
      </div>

      <p>Please, note:</p>
      <ul>
        <li>
          Convey content. Your contribution must have a purpose, and the text of your contribution should make that clear to the reader. Just a title and a collection of pictures with captions, for example, is not acceptable.
        </li>
        <li>
          Writing style should be formal and scientific. Avoid mixing in your own emotions in your writing, prefer written language over spoken language, and avoid abbreviations such as “don’t” or “can’t” but write “do not” and “cannot.” Scientific writing furthermore requires that statements not substantiated in your paper are supported by properly cited references. These general principles also apply to papers that are more descriptive by nature.
        </li>
        <li>
          Use simple language. The larger part of the IMC audience does not have English as native language. Make your paper accessible to as many interested persons as possible by avoiding long sentences, difficult grammatical constructions, or fancy words. Also, avoid needless words. If you can convey a thought in five words rather than ten, go for the former.
        </li>
        <li>
          Please use capital letters only when necessary. Just the first letter of the title should be capitalized. When written out, the cardinal compass directions (south, north...) should also be lowerkey.
        </li>

      </ul>

      <p>
        It is always a good idea to browse through previous IMC Proceedings to get a better feel of what is expected of you as an author.
      </p>


      <h2 className="mt-4">Required elements</h2>

      <p>Your paper should contain the following elements</p>

      <ol>
        <li className="mb-3">
          <b className="d-block fw-bolder">
            Title
          </b>
          The title should reflect the content of the paper. Avoid fancy or clever titles and do not capitalize each word.
        </li>
        <li className="mb-3">
          <b className="d-block fw-bolder">
            Authors
          </b>
          List all contributing authors with full first and last names. Avoid "et al." in the heading.
        </li>
        <li className="mb-3">
          <b className="d-block fw-bolder">
            Affiliations/Addresses and Email Addresses
          </b>
          Use superscript numbers to link authors to their affiliations. Provide at least one affiliation and email address.
        </li>
        <li className="mb-3">
          <b className="d-block fw-bolder">
            Abstract
          </b>
          Provide a brief summary (5-15 lines) of the paper including its main focus, results, and conclusions.
        </li>
        <li className="mb-3">
          <b className="d-block fw-bolder">
            Introduction</b>
          Introduce the subject, provide context, and state the aims of the paper.</li>

        <li className="mb-3">
          <b className="d-block fw-bolder">
            Technical/Detailed Sections</b>
          Use clear section headings and subsections where necessary. Avoid unnecessary sub-subsections.</li>

        <li className="mb-3">
          <b className="d-block fw-bolder">
            Concluding Section(s)</b>
          Summarize the results, discuss their implications, and optionally mention future work.</li>

        <li className="mb-3">
          <b className="d-block fw-bolder">
            Acknowledgments</b>
          Optionally, thank contributors or institutions. Mention project sponsorships here.</li>

        <li className="mb-3">
          <b className="d-block fw-bolder">
            References</b>
          <p>Ensure every reference cited in the text is included. Use the following formats:</p>
          <ul>
            <li className="mb-2"><strong className="d-block">Journals</strong> Asher D. J., Arlt R., and Brown P. (2010). “Title of the paper”. Name of the Journal, 27, 32–35.</li>
            <li className="mb-2"><strong className="d-block">Books</strong> Arlt R. and Rendtel J. (2011). <em>Name of the Book</em>. Publisher Name.</li>
            <li className="mb-2" ><strong className="d-block">Proceedings</strong> Brown P. (2013). “Title”. In Rault J.-L. and Perlerin V., editors, <em>Proceedings of the Name of the Conference</em>, Giron, France, 12-15 October 2014. Publisher Name, pages 124–128.</li>
          </ul>
          Avoid URLs in the reference list as they can become obsolete.</li>

        <li className="mb-3">
          <b className="d-block fw-bolder">
            Figures</b>
          Figures must be numbered and referenced in the text. Provide captions explaining them.</li>

        <li className="mb-3">
          <b className="d-block fw-bolder">
            Tables</b>
          Tables must be numbered and referenced in the text. Captions should appear above the table.</li>

        <li className="mb-3">
          <b className="d-block fw-bolder">
            Responsibility of the Author(s)</b>
          Authors retain copyright. The editors will assist with corrections, but final responsibility lies with the authors.</li>
      </ol>
    </PageContain>
  );
};

export default Guidelines;
