import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import NotecardContainer from ".";
import * as firebaseMock from "firebase-mock";
import "../../util/firebase";

// mock the firestore
const mockFireStore = new firebaseMock.MockFirestore();
// mock the firebase util
jest.mock("../../util/firebase", () => {
  getFirestore: () => mockFireStore;
  getNotecards: () => mockFireStore.collection("Notes");
});

mockFireStore.collection("Notes").add({ text: "Notecard 1" });
mockFireStore.collection("Notes").add({ text: "Notecard 2" });
mockFireStore.collection("Notes").add({ text: "Notecard 3" });

test("Notecard section is rendered", async () => {
  // ARRANGE

  const memory = "est";
  const page = "test";
  const { getByTestId } = render(
    <NotecardContainer memory={memory} page={page} />
  );
  const notecardSection = getByTestId("notecard-section");
  const loading = getByTestId("loading");
  // ACT

  // ASSERT
  await waitFor(() => expect(loading).not.toBeInTheDocument());
  expect(notecardSection).toBeDefined();
});
