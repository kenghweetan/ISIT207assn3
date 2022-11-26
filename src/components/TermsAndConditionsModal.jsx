import { Modal, Text, Title, Anchor } from "@mantine/core";
import { useState } from "react";

export default function TermsAndConditions() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Anchor
        onClick={() => {
          setOpen(true);
        }}
        style={{ display: "inline-block" }}
        size="xs"
      >
        Open terms and conditions
      </Anchor>
      <Modal size="70%" opened={open} onClose={() => setOpen(false)}>
        <Title>
          Terms and Conditions for Owners Using the Pet Heaven Pet Rehoming
          Service
        </Title>
        <br />
        <Text>
          By placing a pet for adoption on Pet Heaven (the “Site”) or any
          related applications or other services (the “Services) operated by Pet
          Heaven, Incorporated (“Pet Heaven”), you (“I” or “you”) agree to the
          Pet Heaven Terms of Service and Privacy Policy as well as the
          following terms (“Rehome Terms”):
        </Text>
        <br />
        <Text>I am at least 18 years of age.</Text>
        <br />
        <Text>
          I certify that under all applicable laws and statutes, I am the legal
          owner or guardian of any pet I post for adoption. If I found a pet and
          believe this pet to be a stray with no legal owner/guardian, I have
          made every reasonable effort to find the pet’s owner prior to posting
          the pet for adoption including, but not limited to, calling any phone
          numbers present on a collar or tag, attempting to find an owner based
          on any information on a collar or tag including state or county
          license number, having the pet scanned for a microchip and contacting
          an owner based upon the results of the scan, placing flyers in my
          neighborhood and at my local animal shelter, and looking for flyers
          and classified “lost pet” ads in my neighborhood and online. I agree
          to follow all applicable laws governing the handling of stray animals.
          For example, in some cases, I may be required by law to take the pet
          to the nearest public shelter, where the owner may be searching for
          him or her. I understand that it is my responsibility to check with
          local animal control or other relevant governmental agency or
          regulatory authority for applicable laws governing stray animals in my
          city.
        </Text>
        <br />
        <Text>
          I understand that the Site and Services are a tool to help me find a
          new home for my pet if I am unable to continue to provide a safe home
          for my pet. Pet Heaven makes no warranties or guarantees that it will
          be successful in helping me find my pet a home, or regarding any of
          its services.
        </Text>
        <br />
        <Text>
          I agree that I am solely responsible for all communication with
          prospective adopters, and all decisions relating to choosing a new
          owner for my pet. I agree and acknowledge that any advice provided
          through the Site or Services is its attempt to assist me, but that Pet
          Heaven does not warranty such advice and Pet Heaven and its affiliates
          and each of its and their respective licensors, suppliers, officers,
          directors, investors, employees, agents, service providers, sponsors,
          partners, and other contractors (the “Pet Heaven Parties”) are not
          liable for any outcome as a result of such advice. No advice is
          appropriate for every situation, and I take full responsibility for
          all decisions and outcomes relating to rehoming my pet.
        </Text>
        <br />
        <Text>
          I agree to respond to all inquiries about my pet that I am listing for
          rehome on the Site or Services (“My Pet”). I understand that it is
          very frustrating for a prospective adopter to inquire about pets for
          adoption and never hear back, and it often causes them to give up on
          adoption and purchase a pet instead. I will help keep people
          interested in pet adoption by being responsive.
        </Text>
        <br />
        <Text>
          I agree that I will conduct all communication with prospective
          adopters in a polite and respectful manner. Any profanity, harassment,
          or abuse will result in My Pet listing being removed. If I receive
          profane, harassing, or abusive communications from a prospective
          adopter, I will let Pet Heaven know and Pet Heaven will make
          reasonable efforts to block them from communicating with me in the
          future through the Site or Services.
        </Text>
        <br />
        <Text>
          I understand that I am responsible for my own safety and for the
          safety of My Pet. I will use utmost care and caution when arranging
          meetings with strangers. I will always bring a friend and meet in a
          public place. I will never exchange personal information. I understand
          that if my intuition tells me something is off, it probably is.
          Regardless, I ACKNOWLEDGE AND AGREE THAT Pet Heaven HAS NO CONTROL
          OVER ANY SUCH MEETING OR THE PERSONS THAT ATTEND SUCH MEETING AND HOLD
          THE Pet Heaven PARTIES HARMLESS AND RELEASE THE Pet Heaven ENTITIES
          FROM ALL LIABILITY WITH REGARD TO SUCH MEETINGS AND THE ACTIONS OF
          PROSPECTIVE ADOPTERS OF MY PET WHICH I CONNECT WITH THROUGH THE SITE
          OR SERVICES.
        </Text>
        <br />
        <Text>
          I agree that all adoption fees collected will be paid to Pet Heaven,
          who will distribute 100% of the fees to the animal shelter or rescue
          group that referred me to the service. If I was not referred, I will
          choose a local shelter or rescue group to receive the funds.
        </Text>
        <br />
        <Text>
          I agree that I will receive no part of these fees. I agree to be
          truthful and accurate in the information I provide about myself and My
          Pet in my listing on the Site or Services and in offline activities
          and communication with prospective adopters. I agree to fully disclose
          any behavioral or health issues of My Pet, without exceptions. I
          understand that failure to disclose known issues may result in my
          termination from the Site and Services, the removal of my listing, and
          other legal consequences.
        </Text>
        <br />
        <Text>
          I AGREE THAT THE Pet Heaven PARTIES SHALL NOT BE LIABLE FOR ANY
          CLAIMS, ACTIONS, INJURY, LOSS OR DAMAGE OF ANY KIND, INCLUDING,
          WITHOUT LIMITATION, THIRD PARTY CLAIMS; DIRECT, INDIRECT,
          CONSEQUENTIAL, INCIDENTAL, OR COMPENSATORY DAMAGES; LOSS OF A PET,
          INJURY TO MYSELF OR ANY OTHER PERSON OR PET, OR LOSS OF LIFE,
          RESULTING FROM OR RELATING TO MY USE OF THE SITE OR SERVICES REHOMING
          SERVICES.
        </Text>
        <br />
        <Text>
          My interactions with organizations or individuals found on or through
          the Site or Services are solely between me and such organizations or
          individuals. I agree to make whatever investigation I feel necessary
          or appropriate before proceeding with any interaction with any of
          these third parties. I agree that the Pet Heaven Parties are not
          responsible or liable for any loss or damage of any kind or nature
          incurred as the result of any of these dealings. If there is a dispute
          between users of the Site or Services, or between users and any third
          party, I understand and agree that the Pet Heaven Parties are under no
          obligation to become involved. In the event that I have a dispute with
          any other user of the Site or Services, I hereby release the Pet
          Heaven Parties from claims, demands, and damages (actual and
          consequential) of every kind or nature, known and unknown, suspected
          and unsuspected, disclosed and undisclosed, arising out of or in any
          way related to such disputes or Pet Heaven services.
        </Text>
        <br />
        <Text>
          I agree that My Pet is current on all legally required vaccines prior
          to adoption. If My Pet is not current on vaccines, I will inform Pet
          Heaven in advance through the Site or Services as it may be able to
          help connect me to low-cost vaccination resources.
        </Text>
        <br />
        <Text>
          I hereby certify that My Pet has not been classified as dangerous or
          vicious by any law-enforcement agency or legal entity, or in my own
          estimation. I further certify that My Pet has not caused the death of
          any human being or animal and that My Pet has not bitten anyone in the
          ten days prior to use of the Site or Services rehoming service.
        </Text>
        <br />
        <Text>
          By posting my pet, I agree to complete the full adoption process
          through the Site and Services, unless the Site or Services had no part
          in facilitating the adoption. If I find an adopter by another means, I
          may still choose to use the Site or Services and tools to complete the
          adoption, and I understand that Pet Heaven encourages me to do so. I
          understand that adoption fees support the work of animal shelters and
          rescue groups in my area, and the resources Pet Heaven provides for
          adopters will help make the adoption a permanent success.
        </Text>
        <br />
        <Text>
          I agree to furnish any and all records to the adopter prior to
          adoption, including medical, vaccine, proof of spay/neuter, and
          microchip paperwork, if I have access to that paperwork. If I was
          referred by an Animal Welfare Organization, I agree to allow my
          contact information to be shared with the organization for the sole
          purpose of supporting the adoption process. I agree that I have read
          and agree to all terms and conditions above.
        </Text>
      </Modal>
    </>
  );
}
