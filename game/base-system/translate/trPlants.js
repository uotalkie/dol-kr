function trPlants(plantname, type, post, sep)
{
	if (!setup.trPlants)
		trinit_plants();

    let trTemp = setup.trPlants.nameIndex[plantname];

    if (!trTemp)
	{
        T.trResult = `trPlants에 정의되지 않음: ${plantname}`;
	}
    else
	{
        if (type[0] === "n" || type[0] === "s")	// name | singular
		{
            T.trResult = trTemp.name_ko;
			trPost(trTemp.post, post, sep);
		}
        else if (type[0] === "p")	//	plural
		{
            T.trResult = trTemp.name_ko; // T.trResult = trTemp.name_ko+"들";
			trPost(trTemp.post, post, sep); // trPost(2, post, sep);
		}
        else if (type[0] === "u")	// unit
		{
            T.trResult = trTemp.unit_ko;
			trPost(trTemp.unit_post, post, sep);
		}
        else
		{
			sep = post;
			post = type;
            if(trTemp.name == plantname || trTemp.singular == plantname)
			{
                T.trResult = trTemp.name_ko;
				trPost(trTemp.post, post, sep);
            }
			else
			{
				T.trResult = trTemp.name_ko; // T.trResult = trTemp.name_ko+"들";
				trPost(trTemp.post, post, sep); // trPost(2, post, sep);
            }
        }
    }
	return T.trResult;
}
window.trPlants = trPlants;
DefineMacro("trPlants", trPlants);

window.trPlantsPlural = (plantname, post, sep) => trPlants(plantname, "plural", post, sep);
DefineMacro("trPlantsPlural", window.trPlantsPlural);