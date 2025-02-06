import PageContain from "components/page-contain";
import React from "react";
import { conferenceData as cd } from 'data/conference-data';
import { formatFullDate, formatFullDatePlusXDays } from 'utils/date';

const Disclaimer = () => {
  return (
    <PageContain title="Service agreement & disclaimer">
      <div className="mx-md-3">
        <p>
          The “International Meteor Conference” is a low-cost non-profit event organized by unpaid volunteers who act according to the best of their abilities. In particular, a low-cost event implies that the accommodation provided is basic in order to be able to offer a low cost event. All participants should be aware that a low-cost event with basic accommodation organized by unpaid volunteers may cause some small inconveniences. The real IMC spirit is the kind of spirit you find around the camp fire of a youth camp. That was also the origin of the IMCs, and the flame of that spirit has been carried from IMC to IMC ever since. This youth-camp spirit is what makes people coming back year after year. Even if part of the accommodation in some recent years was more luxurious, the spirit described above always remained, with a simple functional accommodation for the common activities.
        </p>

        <p>
          Extra nights before or after the IMC and/or private accommodation should be taken care of by the participant and are therefore beyond the responsibility of the IMC organizer. Information provided for this purpose on the <a href='/' rel='noopener noreferrer'>IMC website</a> is of an informative nature only. Accommodation is provided at the conference venue. Therefore, no transportation will be provided between the conference venue and hotels.
        </p>

        <p>
          Food requirements can be honored only to the extent they can be handled by the catering of thoe IMC host. It is therefore recommended to check with the IMC organizer if special food requirements can be met, in particular if they are due to compelling medical reasons. The IMC registration fee is due immediately upon submitting the registration form. Registrations that remain without payment are deleted. All transaction costs are at the participant's expense. Notice in this regard that bank transfers in € within the European Union, Norway, Iceland, and Liechtenstein cost no more than domestic bank transfers (i.e., usually free). Follow the instructions of your bank in order to ensure that the beneficiary receives the complete amount due.
        </p>


        The cancellation policy for the IMC{cd.year} is as follows: 
        <ul>
          <li>
            <b>Until {formatFullDate(cd.deadlines.full_reimbursement_before)}:</b>  full reimbursement, except for {cd.admin_cost} administrative costs.
          </li>
          <li>
            <b>Between {formatFullDatePlusXDays(cd.deadlines.full_reimbursement_before, 1)}{' '}
            and {formatFullDate(cd.deadlines.half_reimbursement_before)}:</b> partial reimbursement of half of the registration fee;
          </li>
          <li>
            After <b>{formatFullDatePlusXDays(cd.deadlines.half_reimbursement_before, 1)}{' '}</b>: no reimbursement.
          </li>
        </ul>

        <p>
          The main aim of the IMC is to offer the opportunity to amateur and professional meteor astronomers to exchange knowledge and ideas through lectures, posters and socializing. The main activities are the lecture and poster sessions. As the conference is rather specialized, no outreach activities should be expected. Everybody is welcome to contribute to the conference program, but the number of lectures is limited. If a lecture does not fit the purpose of the conference, it may be rejected. If the total lecture time requested exceeds the available time, a selection will be made that guarantees the best quality lecture program. The number of posters, on the other hand, is not limited. Posters will only be rejected if their topic is not in line with the aim of the conference. As in most cases lectures and posters are summaries of more elaborate work, their content can and will be covered in the IMC Proceedings. Therefore, a paper for the IMC Proceedings is in principle mandatory for every lecture or poster presented at the IMC. These papers should preferably be submitted before or at the start of the conference, or at the latest on <b>{formatFullDate(cd.deadlines.paper)}</b>. Templates have been made available in both (PDF) LaTeX and Word.
        </p>
 
        <p>
          Participants take part in all IMC activities at their own risk. The IMC hosting accommodation fulfills all legal security requirements. However, if some personal accident happens during the IMC, then in no case the IMC organizer can be held responsible. Participants are recommended to take care of their individual travel insurance and to comply with the regulations of their national or private health insurance for travelling abroad and carry the required documents with them.
        </p>
 
        <p>
          Participants should be at least 18 years old. Underage participants should be accompanied by their parents or accompanied by another duly authorized adult carrying proof of this, signed by the parents, in accordance with the law of the country of origin and the international regulations for minors travelling abroad. Underage participants are assumed to inform themselves properly with their local authorities.
        </p>

        <p>
          Participants who need visa require an invitation letter from the IMC organizer and must provide passport number, official address (private or institute), and birthdate and place of birth for this purpose. Invitation letters for visa are only supplied to known meteor astronomers or people for whom their active involvement in meteor astronomy can be established. In all other cases, and in case of doubt, requests are rejected without notice being given.
        </p>

        <p>
          Each participant declares to have read and accepted this service agreement and disclaimer by confirming this on the registration form.
        </p>

      </div>

    </PageContain>
  );
};

export default Disclaimer;
