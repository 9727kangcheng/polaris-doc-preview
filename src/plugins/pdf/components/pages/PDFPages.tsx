import React, { FC, useContext, useEffect } from 'react';
import { Document } from 'react-pdf';
import styled from 'styled-components';
import { PDFContext } from '../../state';
import { setNumPages } from '../../state/actions';
import { initialPDFState } from '../../state/reducer';
import { PDFAllPages } from './PDFAllPages';
import PDFSinglePage from './PDFSinglePage';
 

const PDFPages: FC<{}> = () => {
  const {
    state: { mainState, paginated },
    dispatch,
  } = useContext(PDFContext);
 

  const currentDocument = mainState?.currentDocument || null;

  useEffect(() => {
    dispatch(setNumPages(initialPDFState.numPages));
  }, [currentDocument]);

  if (!currentDocument || currentDocument.fileData === undefined) return null;

  return (
    <DocumentPDF
      file={currentDocument.fileData}
      onLoadSuccess={({ numPages }) => dispatch(setNumPages(numPages))}
      loading={<span>{('loading')}...</span>}>
      {paginated ? <PDFSinglePage /> : <PDFAllPages />}
    </DocumentPDF>
  );
};

const DocumentPDF = styled(Document)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 940px;
`;

export default PDFPages;
