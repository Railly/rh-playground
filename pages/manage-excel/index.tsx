import { useState } from "react";
import { DataFrame, readExcel, toExcel } from "danfojs";

import CenteredLayout from "../../components/CenteredLayout";

export default function ManageExcel() {
  const [excel, setExcel] = useState<File | null>(null);
  const [parsedExcel, setParsedExcel] = useState<DataFrame | null>(null);

  const handleTransform = async () => {
    const response = await readExcel(excel);
    setParsedExcel(response as DataFrame);
  };

  const handleDownload = (parsedExcel: DataFrame) => {
    toExcel(parsedExcel);
  };

  // const excelAPI = new ExcelAPI({
  //   headers: ["name", "surname", "dni", "phone", "email"],
  //   data: parsedExcel?.values,
  //   validators: [
  //     {
  //       column: "name",
  //       validator: (value) => value.length > 0,
  //       message: "El nombre no puede estar vacío",
  //     }
  //   ]
  // })

  // const ExcelComponents = useGetExcelComponents(excelAPI)

  // <ExcelComponents.Step1 />
  // <ExcelComponents.Step2 />

  return (
    <CenteredLayout>
      <h1 className="font-bold">Manage Excel</h1>
      <div className="flex flex-col max-w-md gap-10">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          htmlFor="file_input"
        >
          Upload file
        </label>
        <input
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setExcel(e.target.files[0]);
            }
          }}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
        />
        <button
          onClick={handleTransform}
          disabled={!excel}
          className="block w-full px-2 py-1 text-sm font-medium text-white transition-colors bg-indigo-600 border border-transparent rounded-lg cursor-pointer hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600"
        >
          Transform
        </button>
      </div>
      {parsedExcel && (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">Parsed Excel</h2>
          <pre>
            {/* <code>{parsedExcel.toString()}</code> */}
            {/* Table with inputs */}
            <table className="table-auto">
              <thead>
                <tr>
                  {parsedExcel
                    .head(1)
                    .values.flat()
                    .map((header) => (
                      <th className="px-4 py-2">{header}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {parsedExcel.values.map((row, indexRow) => {
                  console.log({ row });
                  return (
                    <tr>
                      {(row as string[] | number[]).map((cell, indexCell) => (
                        <td className="px-4 py-2">
                          <input
                            className="w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            type="text"
                            value={cell}
                            onChange={(e) => {
                              const newValues = parsedExcel.values.map((row) =>
                                (row as string[] | number[]).map((cell) => cell)
                              );
                              newValues[indexRow][indexCell] = e.target.value;
                              setParsedExcel(new DataFrame(newValues));
                            }}
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </pre>
          <button
            onClick={() => handleDownload(parsedExcel)}
            className="block w-full px-2 py-1 text-sm font-medium text-white transition-colors bg-indigo-600 border border-transparent rounded-lg cursor-pointer hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
          >
            Export to Excel
          </button>
        </div>
      )}
    </CenteredLayout>
  );
}
